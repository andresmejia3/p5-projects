function Ball(x,y){
  this.position = createVector(x,y);


  //METHODS

  this.draw = function(){
    fill(255,0,0);
    noStroke();
    ellipse(this.position.x, this.position.y, 10);
  }
}
