function Vehicle(x, y, r, g, b){
  this.pos = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxSpeed = 10;
  this.maxForce = 1;
  this.target = createVector(x, y);
  this.red = r;
  this.green = g;
  this.blue = b;
};

Vehicle.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Vehicle.prototype.show = function(){
  ellipse(this.pos.x, this.pos.y, 10);
};

Vehicle.prototype.applyForce = function(force){
  this.acc.add(force);
};

Vehicle.prototype.forces = function(){
  var mouse = createVector(mouseX, mouseY);
  var arrive = this.arrivingForce(this.target);
  var flee = this.fleeingForce(mouse);

  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);

}

Vehicle.prototype.arrivingForce = function(target){
  var desired = p5.Vector.sub(target, this.pos);
  var speed = this.maxSpeed;
  var distance = desired.mag();
  if (distance < 100){
    speed = map(distance, 0, 100, 0, this.maxSpeed);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer
};

Vehicle.prototype.fleeingForce = function(target){
  var desired = p5.Vector.sub(target, this.pos);
  var distance = desired.mag();
  if (distance < 50){
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer
  }else{
    return createVector();
  }
};

var font;
var vehicles = [];

function preload(){
  font = loadFont('https://raw.githubusercontent.com/CodingTrain/Rainbow-Code/master/CodingChallenges/CC_59_Steering_Text_Paths/AvenirNextLTPro-Demi.otf');

}

function setup(){
  v = new Vehicle(400, 400);
  createCanvas(1000, 300);
  background(51);

  var txt = "Bradley Nuezca";
  textFont("Times New Roman");
  textSize(128);
  fill(255);
  noStroke();
  text(txt, 150, 200);
  var points = font.textToPoints(txt, 25, 200);

  for(var i=0; i<points.length;i++){
    var pt = points[i];
    var red = random(0,255);
    var green = random(50,150);
    var blue = random(50,150);
    var vehicle = new Vehicle(pt.x, pt.y, red, green, blue);
    vehicles.push(vehicle);
  }
};

function draw(){
  background(51);
  for(var i=0; i<vehicles.length; i++){
    var v = vehicles[i];
    v.forces();
    v.update();
    v.show();
    stroke(v.red, v.green, v.blue);
    strokeWeight(4);
    point(v.x, v.y);
  }
}
