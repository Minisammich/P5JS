// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawCircle(width/2,height/2);
}

function drawCircle(x,y) {
  push();
  let s = (2*x+2*y)/3;

  translate(x,y);

  circle(0,0,s);

  fill(255,0,0);
  hand(4,s*0.5,1);

  fill(255,255,0);
  hand(4,s*0.5,2);

  fill(0,255,0);
  hand(4,s*0.5,3);

  fill(0,255,255);
  hand(4,s*0.5,4)

  fill(0,0,255);
  hand(4,s*0.5,5);

  fill(255,0,255);
  hand(4,s*0.5,6);

  fill(0);
  circle(0,0,20);


  pop();
}

function hand(wi,h,v) {
  let w = wi*5
  push();
  rotate(frameCount/10*v);
  rect(-w/2,0,w,h);
  pop();
}