
const canvasElem = document.getElementById('canvas');
const scoreElem = document.getElementById('score');

let score = 0;
let velocity = 5.07964;
let step = 1;

scoreElem.textContent = `Score: ${score}`;

let objBall = {
    x: 300,
    y: 240,
    rad: 15,
}

let objCoin = {
    x: getRandomInt(1, canvasElem.width),
    y: getRandomInt(1, canvasElem.height),
}


window.addEventListener("keydown", keyDownEventsHandler)
requestAnimationFrame(gameLoop);





function gameLoop() {


    update();
    draw();

    requestAnimationFrame(gameLoop);
}

function update() {
    if (collisionDetection(objBall.x, objCoin.x, objBall.y, objCoin.y)) {
        objCoin.x = getRandomInt(1, canvasElem.width);
        objCoin.y = getRandomInt(1, canvasElem.height);
        
        step++;
        velocity = velocity + velocity*0.6667**step;
        score += 10;
        scoreElem.textContent = `Score: ${score}`;

        console.log(velocity);
    }
}

function draw() {

    const ctx = canvasElem.getContext('2d');

    ctx.clearRect(0, 0, 600, 480);

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

    ctx.beginPath(objCoin.x, objCoin.y);
    ctx.arc(objCoin.x, objCoin.y, 5, 0, Math.PI * 2, true);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath(objBall.x, objBall.y);
    ctx.arc(objBall.x, objBall.y, objBall.rad, 0, Math.PI * 2, true)
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();


}

function keyDownEventsHandler(e) {
    if (e.key === "ArrowUp" && objBall.y > 0) {
        objBall.y -= velocity;
    }
    if (e.key === "ArrowDown" && objBall.y < canvasElem.height) {
        objBall.y += velocity;
    }

    if (e.key === "ArrowRight" && objBall.x < canvasElem.width) {
        objBall.x += velocity;
    }
    if (e.key === "ArrowLeft" && objBall.x > 0) {
        objBall.x -= velocity;
    }
}

function collisionDetection(x1, x2, y1, y2) {
    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);

    return (a < objBall.rad && b < objBall.rad);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }