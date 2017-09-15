
var ball;
var rings;
var biggestRadius;
var pointSystem;


function setup(){
  createCanvas(800, 800);
  ball = new Ball(width/2, height/2);

  rings = [];
  biggestRadius = 50;
  pointSystem = new PointSystem();


  for (var i=0; i<4; i++){
    rings.push(new Ring(biggestRadius))
    biggestRadius += 30;
  }
}


function draw(){
  background(51);

  pointSystem.displayPoints();
  ball.draw();
  for(var i=0; i<rings.length; i++){
    rings[i].draw();
    rings[i].update();
  }

}

// function mousePressed(){
//   rings.push(new Ring(biggestRadius))
//   biggestRadius += 30;
// }
