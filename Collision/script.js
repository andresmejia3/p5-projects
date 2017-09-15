function Circle(x, y){
  this.x = x;
  this.y = y;
  this.radius = random(50) + 25;
  var dir = p5.Vector.random2D();
  this.dx = dir.x;
  this.dy = dir.y;

  this.update = function(){
    var leftBound = this.x -this.radius <= -20;
    var rightBound = this.x + this.radius >= 720;
    var upperBound = this.y - this.radius <= -20;
    var lowerBound = this.y + this.radius >= 720;

    if (leftBound || rightBound || upperBound || lowerBound){
      this.x -= this.dx;
      this.y -= this.dy;

      this.dx = -this.dx;
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

  }

  this.show = function(){
    ellipse(this.x, this.y, this.radius, this.radius);
  }

  this.collision = function(circle){
    if (this.distanceTo(circle) <= this.radius + circle.radius){
      return true;
    }
  }

  this.distanceTo = function(object){
    return sqrt(pow(this.x, 2) + pow(this.y, 2));
  }
}

function mousePressed(){
  circles.push(new Circle(mouseX, mouseY));
}

var circles = [];

function setup(){
  createCanvas(700, 700);
}

function draw(){
  background(51);
  circles.push(new Circle(720/2,720/2));
  for (var i=0; i<circles.length; i++){
    fill(random(255));
    circles[i].update();
    circles[i].collision(circles);
    circles[i].show();
  }
}
