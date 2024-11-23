// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let Roboto;

let cam;
let xCam = 0;
let yCam = 0;
let zCam = 800;
let zOff;
let lookX = 0;
let lookY = 0;

function preload() {
  Roboto = loadFont("Roboto/Roboto-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  textFont(Roboto);
  cam = createCamera();
  cam.lookAt(0,0,0);
  setCamera(cam);
}

function keyChecks() {
  if(keyIsDown(188)) {
    zCam -= 10;
  } else if(keyIsDown(79)) {
    zCam += 10;
  } 

  if(keyIsDown(65)) {
    xCam -= 10;
  } else if(keyIsDown(69)) {
    xCam += 10;
  }

  if(keyIsDown(LEFT_ARROW)) {
    lookX += 5;
    if(lookX >= 360) lookX = 0;
  } else if(keyIsDown(RIGHT_ARROW)) {
    lookX -= 5;
    if(lookX <= -360) lookX = 0;
  }

  
  if(keyIsDown(UP_ARROW) && lookY > -85) {
    lookY -= 5;
  } else if(keyIsDown(DOWN_ARROW) && lookY < 85) {
    lookY += 5;
  }

}

function onScreenText(screenText,x,y) {
  push();
  translate(xCam,yCam,zCam);
  rotateY(180+lookX);
  rotateX(lookY);
  translate(0,0,-120);
  text(screenText,-width/13+x,-height/13+y);
  pop();
}

function draw() {
  background(220);
  cube_orbiting_globe();
  push();
  translate(0,0,1000);
  cube_orbiting_globe();
  pop();
  keyChecks();
  cam.setPosition(xCam,yCam,zCam);
  if((lookX > -90 && lookX < 90) || (lookX && lookX)) zOff = 1+cos(lookX)-cos(lookY);
  if((lookX < -90 && lookX > -180) || (lookX && lookX)) zOff = 3-cos(lookX)-cos(lookY);
  cam.lookAt(xCam+sin(lookX),yCam+sin(lookY),zCam+zOff);
  onScreenText(lookX,10,15);
  onScreenText(lookY,10,25);
  onScreenText(zOff,10,35);
}

function cube_orbiting_globe() {
  push();
  rotateY(frameCount);
  fill(0,0,255);
  stroke(100,200,100);
  sphere(100,24,24);
  push();
  fill(100,100,150);
  translate((width/2)-400,0,0);
  rotateY(0);
  rotateX(45);
  rotateZ(45);
  box(50,50,50);
  pop();
  pop();
}
