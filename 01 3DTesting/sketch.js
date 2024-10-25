// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  push();
  background(220);
  rotateY(frameCount);
  fill(0,0,255);
  stroke(100,200,100);
  sphere(50,24,24);
  push();
  fill(100,100,150);
  translate((width/2)-200,0,0);
  rotateY(frameCount);
  rotateY(0);
  rotateX(45);
  rotateZ(45);
  box(50,50,50);
  pop();
  pop();
}
