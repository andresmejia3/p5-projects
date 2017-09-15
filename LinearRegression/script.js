function Coordinate(x, y){
  this.x = x;
  this.y = y;

  this.show = function(){
    strokeWeight(5);
    fill(255, 0, 0);
    point(x, y);
  }
};


function mousePressed(){
  points.push(new Coordinate(mouseX, mouseY));
}



function adjustLine(){
  var yIntercept = findYIntercept();
  line(0, yIntercept, 400, (findSlope()*400) + yIntercept);
}

function findYIntercept(){
  return meanY() - findSlope() * meanX();
}



function findSlope(){
  var barX = meanX();
  var barY = meanY();

  var num = 0;
  var denom = 0;

  for(var i = 0; i < points.length; i++){
    num += (points[i].x - barX) * (points[i].y - barY);
    denom += (points[i].x - barX) * (points[i].x - barX);
  }

  return num / denom


}



function meanX(){
  var total = 0;
  for(var i = 0; i < points.length; i++){
    total += points[i].x;
  }
  return total/points.length;
}



function meanY(){
  var total = 0;
  for(var i = 0; i < points.length; i++){
    total += points[i].y;
  }
  return total/points.length;
}


function getFormula(){
  var m = findSlope();
  var b = findYIntercept();

  return "y = "+ m +"x + " + b;
}


var points = [];

function setup(){
  createCanvas(400, 400);
}

function draw(){
  background(51);
  for(var i = 0; i < points.length; i++){
    points[i].show();
  }
  adjustLine();
}
