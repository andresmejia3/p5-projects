
function Electron(x, y){
  this.position = createVector(x, y);
  this.velocity = p5.Vector.random2D();
  this.acceleration = createVector();

  this.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //ORBIT ONLY HOLDS WHEN YOU ADD VELOCITY TO POSITION FIRST//
    //FIX IT
  }

  this.show = function(){
    stroke(250);
    strokeWeight(4);
    point(this.position.x, this.position.y);
  }

  this.pull = function(target){
    var directionalForce = p5.Vector.sub(target, this.position);
    var directionSquared = directionalForce.magSq();
    directionSquared = constrain(directionSquared, 100, 500);
    var G = 6.67408;
    var G = 150;
    var magnitude = G / directionSquared;
    directionalForce.setMag(magnitude);
    this.acceleration = directionalForce;

    //ACC -> VEl
    //VEL -> position


    //VEL -> position
    // ACC -> VEL
  }
}


var neutron;
var electrons = [];

function setup(){
  createCanvas(700,700);
  background(51);
  neutron = createVector(350,350);
  electrons.push(new Electron(350, 450));
  electrons.push(new Electron(350, 250));
  electrons.push(new Electron(250, 350));
  electrons.push(new Electron(450, 350));

  // electrons[0].velocity = createVector(1.9539039424218174, 2.8928156762181185);
  // electrons[2].velocity = createVector(-0.5948259338526416, -0.7970171947689935);
  // electrons[3].velocity = createVector(0.5767048272132316, -3.732955873089696);
  // electrons[2].velocity = createVector(-2.4151496470660767, -2.2263989157825326);

  //electrons.push(new Electron(1.9539039424218174, 2.8928156762181185));
  //electrons.push(new Electron(-0.5948259338526416, -0.7970171947689935));
  //electrons.push(new Electron(0.5767048272132316, -3.732955873089696));
  //electrons.push(new Electron(-2.4151496470660767, -2.2263989157825326));
  //{x: 1.9539039424218174, y: -2.8928156762181185, z: 0}
  //{x: -0.5948259338526416, y: -0.7970171947689935, z: 0}
  //{x: 0.5767048272132316, y: -3.732955873089696, z: 0}
  //{x: -2.4151496470660767, y: -2.2263989157825326, z: 0}
}


function draw(){
  //background(51);
  stroke('black');
  strokeWeight(12);
  point(neutron.x, neutron.y);

  stroke('white');
  strokeWeight(6);
  point(neutron.x, neutron.y);


  for(var i=0; i<electrons.length;i++){
    //electrons[i].pull(createVector(mouseX, mouseY));
    electrons[i].pull(neutron);
    electrons[i].update();
    electrons[i].show();
  }
}
