// Blocks.
// Jeffrey Hamilton
// 06/02/2025 - February 6th, 2025.

let blocks = [];
let stats;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER)
  frameRate(60);
  blocks.push(new Block(100, 0, 50, 50));
  blocks.push(new Block(200, 0, 100, 100));
  blocks.push(new Block(350, 0, 150, 150));
  blocks.push(new Block(550, 0, 200, 200));
  blocks.push(new Block(800, 0, 250, 250));
  blocks.push(new Block(1100, 0, 300, 300));
  blocks.push(new Block(1450, 0, 350, 350));

  stats = blocks[0].get_stats();
}

function draw() {
  background(220);

  textAlign(LEFT, TOP);
  text("1 px = 1mm\n\n d = "+stats["d"]*1E6+"kg/m^2\n ρ ="+stats["ρ"]+"kg/m^2\n Cd = " + stats["Cd"], 10, 10);
  textAlign(CENTER, CENTER);
  text(width + "mm x " + height + "mm", width/2, 20);

  drawGrid();

  for(let i = 0; i < blocks.length; i++){
    blocks[i].block_update();
  }
}

function drawGrid() {
  stroke(100,100,100,100);
  for(let i = 0; i < width; i+=10){
    line(i, 0, i, height);
  }
  for(let i = 0; i < height; i+=10){
    line(0, i, width, i);
  }
}

class Block{ 
  constructor(x, y, w, h){
    this.x = x; // x position (mm)
    this.y = y; // y position (mm)
    this.w = w; // width (mm)
    this.h = h; // height (mm)

    this.a = this.w*this.h; // area (mm^2)
    this.d = 1.045E-5; // density (kg/mm^2)
    this.m = (this.a*this.d); // mass (kg)

    this.g = 9.81; // gravity (m/s^2)
    this.Fg = this.m*(this.g); // force of gravity (N)
    this.vel_x = 0; // velocity x (mm/s)
    this.vel_y = 0; // velocity y (mm/s)

    this.ρ = 10.225; // air density (kg/m^2)
    this.Cd = 1.05; // drag coefficient
    this.terminal_velocity = 1000*(sqrt( (2*this.Fg) / (this.ρ*this.Cd *(this.w/1000)) )); // terminal velocity (mm/s)

    this.drag = false;
    this.col = color(random(255), random(255), random(255)); // color

    this.enable_debug = true;
  }

  get_stats() {
    return {
      d: this.d,
      ρ: this.ρ,
      Cd: this.Cd
    }
  }

  display(col){
    fill(col);
    stroke(75);
    rect(this.x, this.y, this.w, this.h);
    if(this.enable_debug){
      fill(0);
      text(
      "mass: " + round(this.m,3) + "kg\n" +
      "force: " + round(((this.Fg)),3) + "N\n" +
      "Vmax: " + round(this.terminal_velocity) + "mm/s", this.x + this.w/2, this.y + this.h/2);

       line(this.x + this.w/2, this.y + this.h, this.x + this.w/2, height);
       text(round(height-this.h-this.y)/10 + "cm", this.x + this.w/2 + 30, (height - (height-this.h-this.y)/2) - 10);
    }
  }

  block_update(){
    let col = this.col;
    if(this.block_mouseOver()){
      col = color(255, 0, 0);
      if(mouseIsPressed){
        this.drag = true;
      } else {
        this.drag = false;
      }
    }

    if(this.drag){
      col = color(205, 0, 50);
      this.block_move(mouseX - this.w/2, mouseY - this.h/2);
    } else {
      this.block_gravity();
    }

    this.display(col);
  }

  block_gravity(){
    if(this.vel_y + ((this.g*1000)/60) < this.terminal_velocity){
      this.vel_y += ((this.g*1000)/60);
    } else {
      this.vel_y = this.terminal_velocity;
    }

      if(this.y + this.h < height){
        this.y += (this.vel_y/60);
      } else {
        this.vel_y = 0;
        this.y = height - this.h;
      }
    }

    block_move(x,y){
      this.x = x;
      this.y = y;
    }

    block_mouseOver(){
      if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
        return true;
      } else {
        return false;
      }
    }
  }