var bgsong, fft, fftLin;
var spectrumScale = 1;
var linNum = 40;
var r = 0;
var x = [];
var y = [];

function preload() {
  bgsong = loadSound("bgsound.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  noStroke();
  fft = new p5.FFT();
  bgsong.setVolume(1);
  bgsong.loop();
  fft.analyze();
  fftLin = fft.linAverages(linNum);
  for (var i = 0; i < fftLin.length; i++) {
    if (i == 0) {
      x[i] = 0;
      y[i] = 0;
    } else {
      x[i] = random(-width / 4, width / 2);
      y[i] = random(-height / 2, height / 2);
    }
  }
}

function mousePressed() {
  if (bgsong.isPlaying()) {
    bgsong.pause();
  } else {
    bgsong.play();
    background('#b4eb34');
  }
}

function draw() {
  fft.analyze();

  fftLin = fft.linAverages(linNum);
  noStroke();
  fill(0, 0, 0, 20);
  rect(0, 0, width, height);
  translate(width / 2, height / 2);
  rotate(radians(r));
  for (var i = 0; i < fftLin.length; i++) {
    strokeWeight(3);
    if (i % 2 == 1) {
      stroke(255);
    } else {
      stroke(255, 0, 0);
    }
    if (i == 0) {
      fill(255, 0, 0);
      ellipse(x[i], y[i], fftLin[i] * spectrumScale * 2, fftLin[i] * spectrumScale * 2);
    } else {
      noFill();
      ellipse(x[i], y[i], fftLin[i] * spectrumScale, fftLin[i] * spectrumScale);
      rect(x[i], y[i], width, height);

    }
  }
  r += .51;
}
