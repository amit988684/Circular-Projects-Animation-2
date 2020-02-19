var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

function Nodes(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;
  // this.color = `rgba(${Math.random() * 255},${Math.random() *
  //   255},${Math.random() * 255},${Math.random() + 0.5})`;
  this.color = "black";

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };
  this.update = function(xl, yl) {
    c.beginPath();
    c.arc(xl, yl, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };
}
// var node = new Nodes(100,100,20);
// node.draw();

// c.beginPath();
// c.arc(innerWidth/2,innerHeight/2,50,0,Math.PI*2,false);
// c.stroke();
// c.beginPath();
// c.arc(innerWidth/2+50,innerHeight/2,10,0,Math.PI*2,false);
// c.stroke();

var velocity = 3;
var radians = (Math.PI / 360) * velocity;
var angle = 0;
function CircularPath(x, y, radius, numNodes, nodeRadius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.cx = this.x + this.radius;
  this.cy = this.y;
  this.node = new Nodes(this.x, this.y, nodeRadius);

  this.update = function() {
    this.cx = this.x + radius * Math.cos(angle);
    this.cy = this.y + radius * Math.sin(angle);
    this.node.update(this.cx, this.cy); // to create the circulating node
    this.node.draw(); // to create the center node
    angle += radians;
  };
}

var cir1 = new CircularPath(innerWidth / 2, innerHeight / 2, 100, 1,10);

function Myanimate() {
  requestAnimationFrame(Myanimate); // To Create a loop
  c.clearRect(0, 0, innerWidth, innerHeight);
  cir1.update();
}

Myanimate();

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = `rgba(${Math.random() * 255},${Math.random() *
    255},${Math.random() * 255},${Math.random() + 0.5})`;
  //   this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;

    // Interactivity with the canvas occurs here

    if (
      mouse.x - this.x < 100 &&
      mouse.x - this.x > -100 &&
      mouse.y - this.y < 100 &&
      mouse.y - this.y > -100
    ) {
      if (this.radius < maxRadius) this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}
