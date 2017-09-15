

function Ring(radius){

  this.theta = random(360);
  this.radius = radius;

  var offset = createVector(400, 400);
  var x = radius * cos(this.theta);
  var y = radius * sin(this.theta);
  var shieldPos = createVector(x,y);

  this.shield = p5.Vector.add(shieldPos, offset);
  this.shieldSpeed = random(0.001,0.1);

  //METHODS

  this.draw = function(){
    stroke(255);
    noFill();
    ellipse(width/2, height/2, 2 * this.radius);
    //ellipse(this.shield.x, this.shield.y, 10);
    var d = 2 * this.radius;
    strokeWeight(5);
    stroke(255,0,0);
    arc(width/2, height/2, d, d, this.theta - 0.5, this.theta + 0.5);
  }

  this.update = function(){
    //this.theta += 0.025;
    if (this.theta + this.shieldSpeed > 360){
      this.theta += (this.shieldSpeed - 360);
    }else{
      this.theta += this.shieldSpeed;
    }

    var x = radius * cos(this.theta);
    var y = radius * sin(this.theta);
    var shieldPos = createVector(x,y);

    this.shield = p5.Vector.add(shieldPos, offset);
  }


this.contact = function(ball){
  var distance = dist(width/2, height/2, ball.position.x, ball.position.y);
  var bound1 = this.shield - 0.5;
  var bound2 = this.shield + 0.5;
  if (distance == this.radius && bound1 <= getAngle(ball) <= bound2){
    return true;
  }
  return false;
}


}



function getAngle(ball){
  var ballPos = createVector(ball.pos.x, ball.pos.y);

  if (ballPos != createVector()){
    return acos(ballPos.x/ballPos.mag()) * (180/PI);
  }
  return 0.0;
}
