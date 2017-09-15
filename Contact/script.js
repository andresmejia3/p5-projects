function Circle(x, y){
  this.x = x;
  this.y = y;
  this.r = 1;
  this.growing = true;

  this.update = function(){
    if (this.growing){
      this.r += 0.5;
    }
  }

  this.show = function(){
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(this.x, this.y, this.r * 2);
    point(this.x, this.y);
  }

  this.detectEdges = function(){
    var leftCheck = this.x - this.r <= 0;
    var rightCheck = this.x + this.r >= width;
    var botCheck = this.y + this.r >= height;
    var topCheck = this.y + this.r <= 0;

    return leftCheck || rightCheck || botCheck || topCheck;
  }



  this.detectContact = function(){
    for (var i=0; i < circles.length; i++){
      var distance = dist(this.x, this.y, circles[i].x, circles[i].y);
      var totalRadius = this.r + circles[i].r;

      var distanceToSelfCheck = distance != 0;
      var radiusDifference = distance < totalRadius;
      if (this.detectEdges()){
        this.growing = false;
      }else if (distanceToSelfCheck && radiusDifference){
        this.growing = false;
        break;
      }
    }
  }
}

Circle.isValidCircle = function(x, y){
  for (var i=0; i<circles.length; i++){
    var distance = dist(x, y, circles[i].x, circles[i].y);
    if (distance < circles[i].r + 1){
      return false;
    }
  }return true;
}

function mousePressed(){
  circles.push(new Circle(mouseX, mouseY));
}

function makeCircles(){
  do{
    var x = random(1, width);
    var y = random(1, height);
  }while(!Circle.isValidCircle(x, y));

  circles.push(new Circle(x, y));

  for(var i = 0; i < circles.length; i++){
    circles[i].show();
    circles[i].update();
    circles[i].detectContact();
  }
}

var circles = [];

function setup(){
  createCanvas(800, 800);
}

function draw(){
  background(51);
  makeCircles();

  //FIGURE OU
}
