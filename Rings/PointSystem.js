function PointSystem(){
  this.points = 0;


  //METHODS
  this.displayPoints = function(){
    fill(255);
    noStroke();
    textSize(32);
    text(this.points.toString(), 25, 50);
  }

  this.update = function(ball){
    var leftAndRight = ball.pos.x < 0 || ball.pos.x > width;
    var topAndBottom = ball.pos.y < 0 || ball.pos.y > height;

    if (leftAndRight || topAndBottom){
      this.points++;
    }
  }
}
