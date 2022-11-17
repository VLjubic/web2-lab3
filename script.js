var myGamePiece = [];
let canvas = document.getElementById("canvas");
let numOfRects = Math.floor(Math.random() * 5) + 1;
let numOfHits = 0;

function startGame() {
  let color = new Array("#ccd907", "#0a087a", "#e70e0e", "#1d6206", "#4e5f3s");
  for (let i = 0; i < numOfRects; i++) {
    let x = Math.floor(Math.random() * 700) + 20;
    let y = Math.floor(Math.random() * 250) + 20;
    let xSpeed = Math.floor(Math.random() * 5) + 1;
    let ySpeed = Math.floor(Math.random() * 5) + 1;
    myGamePiece[i] = new component(
      80,
      40,
      color[(i + 5) % 5],
      x,
      y,
      xSpeed,
      ySpeed
    );
  }
  myGameArea.start();
}
var myGameArea = {
  start: function () {
    let canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    canvasLeftPosition = canvas.offsetLeft + canvas.clientLeft;
    canvasTopPosition = canvas.offsetTop + canvas.clientTop;
    canvas.addEventListener(
      "click",
      function (event) {
        var x = event.pageX - canvasLeftPosition,
          y = event.pageY - canvasTopPosition;

        myGamePiece.forEach(function (element) {
          if (
            y > element.y - element.height / 2 &&
            y < element.y + element.height / 2 &&
            x > element.x - element.width / 2 &&
            x < element.x + element.width / 2
          ) {
            let index = myGamePiece.indexOf(element);
            if (index > -1) {
              numOfHits += 1;
              myGamePiece.splice(index, 1);
            }
          }
        });
      },
      false
    );
    window.requestAnimationFrame(updateGameArea);
  },
  clear: function () {
    let canvas = document.getElementById("canvas");
    this.context.clearRect(0, 0, canvas.width, canvas.height);
  },
};

function component(width, height, color, x, y, xSpeed, ySpeed) {
  this.width = width;
  this.height = height;
  this.speed_x = xSpeed;
  this.speed_y = ySpeed;
  this.x = x;
  this.y = y;

  this.update = function () {
    ctx = myGameArea.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "black";
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  };

  this.newPos = function () {
    let speedUp = Math.floor(Math.random() * 3) + 1;
    let acceleration = speedUp;
    if (this.x - this.width / 2 < 0) this.speed_x = xSpeed + acceleration;
    else if (this.x + this.width / 2 >= myGameArea.context.canvas.width)
      this.speed_x = -(xSpeed + acceleration);
    if (this.y - this.height / 2 < 0) this.speed_y = -(ySpeed + acceleration);
    else if (this.y + this.height / 2 >= myGameArea.context.canvas.height)
      this.speed_y = ySpeed + acceleration;
    this.x += this.speed_x;
    this.y -= this.speed_y;
  };
}

function updateText() {
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext("2d");
  context.font = "12px Arial";
  context.fillStyle = "black";
  let txt = "Broj generiranih pravokutnika: " + numOfRects;
  let txt2 = "Broj pogođenih pravokutnika: " + numOfHits;
  context.fillText(txt, 795 - context.measureText(txt).width, 12);
  context.fillText(txt2, 795 - context.measureText(txt2).width, 30);
  if (numOfRects == numOfHits) {
    let txt3 = "Igra je gotova";
    context.font = "25px Arial";
    context.fillStyle = "green";
    context.fillText(txt3, 320, 140);
  }
}

function updateGameArea() {
  myGameArea.clear();
  let len = myGamePiece.length;
  for (let j = 0; j < len; j++) {
    myGamePiece[j].newPos();
    myGamePiece[j].update();
  }
  updateText();

  window.requestAnimationFrame(updateGameArea);
}
