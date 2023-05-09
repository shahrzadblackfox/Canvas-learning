var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
/* c.fillStyle = "rgba(244,0,0,0.5)";
c.fillRect(100, 100, 100, 100);
c.fillStyle = "rgba(144,24,12,0.5)";
c.fillRect(300, 200, 100, 100); */

//lines

/* c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.strokeStyle = "blue";
c.stroke();

//arc
c.beginPath();
c.arc(300, 400, 50, 0, Math.PI * 2, false);
c.strokeStyle = "green";
c.stroke();

for (var i = 0; i < 40; i++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  c.beginPath();
  c.arc(x, y, 50, 0, Math.PI * 2, false);
  c.strokeStyle =
    "rgba(" +
    Math.random() * 255 +
    "," + // Randomly generated brightness for color red
    Math.random() * 255 +
    "," + // Randomly generated brightness for color green
    Math.random() * 255 +
    "," + // Randomly generated brightness for color blue
    Math.random() +
    ")"; // Randomly generated transparency for alpha
  c.stroke();
} */
/* function getRandomColor() {
  var trans = "0.5"; // 50% transparency
  var color = "rgba(";
  for (var i = 0; i < 3; i++) {
    color += Math.floor(Math.random() * 255) + ",";
  }
  color += trans + ")"; // add the transparency
  return color;
} */

var maxRadius = 60;
var mouse = {
  x: undefined,
  y: undefined,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  var color1 = Math.floor(Math.random() * 255);
  var color2 = Math.floor(Math.random() * 255);
  var color3 = Math.floor(Math.random() * 255);
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = function () {
    c.beginPath();

    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = `rgba(${color1},${color2},${color3},0.5)`;
    c.stroke();
    c.fillStyle = `rgba(${color1},${color2},${color3},0.5)`;
    c.fill();
  };
  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.y += this.dy;
    this.x += this.dx;

    //harkat be same mouse
    if (
      mouse.x - this.x < 100 &&
      mouse.x - this.x > -100 &&
      mouse.y - this.y < 100 &&
      mouse.y - this.y > -100
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > 10) {
      this.radius -= 1;
    }

    this.draw();
  };
}
var circleArray = [];
function init() {
  circleArray = [];
  for (var i = 0; i < 700; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var dx = Math.random() - 0.5;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dy = Math.random() - 0.5;
    var radius = Math.random() * 64 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
init();
