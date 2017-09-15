function Tracker(x, y){
  this.pos = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.maxSpeed = 10;
  this.maxForce = 1;
  this.isAssigned = false;
  this.assignedPos = createVector();
}


Tracker.prototype.show = function(){
  stroke(255);
  if(this.isAssigned){
    stroke(random(256), random(256), random(256));
    strokeWeight(5);
  }
  ellipse(this.pos.x, this.pos.y, 10);
}


Tracker.prototype.update = function(){
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Tracker.prototype.applyForce = function(force){
  this.acc.add(force);
}


Tracker.prototype.allForces = function(){
  var mouse = createVector(mouseX, mouseY);
  var arrival = this.arrivingForce(mouse);
  var flee = this.fleeingForce(mouse);

  flee.mult(5);

  this.applyForce(arrival);
  this.applyForce(flee);
}


Tracker.prototype.arrivingForce = function(target){
  if (this.isAssigned){
    target = this.assignedPos;
  }
  var correctionVector = p5.Vector.sub(target, this.pos);
  var distance = correctionVector.mag();
  var speed = this.maxSpeed;

  if (distance <= 100){
    speed = map(distance, 0, 100, 0, this.maxSpeed);
  }
  correctionVector.setMag(speed);

  var steeringVector = p5.Vector.sub(correctionVector, this.vel);
  steeringVector.limit(this.maxForce);

  return steeringVector;
}

Tracker.prototype.fleeingForce = function(target){
  var desired = p5.Vector.sub(target, this.pos)
  var distance = desired.mag();

  if (distance < 20){
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }return createVector();

  //Wrong. They still gather at the end;
}

function mousePressed(){
  var t = trackers[index++];
  t.isAssigned = true;
  t.assignedPos = createVector(mouseX, mouseY);
}

var trackers = [];
var index = 0;

function setup(){
  createCanvas(800, 800);
  trackers.push(new Tracker(200, 200,));
  for (var i=0; i<100; i++){
    trackers.push(new Tracker(random(width), random(height)));
  }
}


function draw(){
  background(51);
  for (var i=0; i<trackers.length; i++){
    trackers[i].allForces();
    trackers[i].update();
    trackers[i].show();
  }
}
