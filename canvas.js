var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener("mousemove", function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

var maxRadius = 40;
function Nodes(x, y, radius) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;
  this.color = `rgba(${Math.random() * 255},${Math.random() *
    255},${Math.random() * 255},${Math.random() + 0.5})`;
  // this.color = "black";

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function(args) {
    this.x = args[0];
    this.y = args[1];
    console.log(args);

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

function CircularPath(x, y, radius, numNodes, nodeRadius, velocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.cx = this.x + this.radius;
  this.cy = this.y;
  this.node = new Nodes(this.x, this.y, nodeRadius);

  this.velocity = velocity;
  var radians = (Math.PI / 360) * velocity;
  var angle = 0;

  this.update = function() {
    this.cx = this.x + radius * Math.cos(angle);
    this.cy = this.y + radius * Math.sin(angle);
    this.node.update([this.cx, this.cy]); // to create the circulating node
    // this.node.draw(); // to create the center node
    angle += radians;
  };
}

var cir1 = new CircularPath(innerWidth / 2, innerHeight / 2, 200, 1, 30, 3);
var centerNode = new Nodes(innerWidth / 2, innerHeight / 2, 10);
function Myanimate() {
  requestAnimationFrame(Myanimate); // To Create a loop
  c.clearRect(0, 0, innerWidth, innerHeight);
  cir1.update();
  centerNode.draw();
  // console.log(mouse);
}

Myanimate();
