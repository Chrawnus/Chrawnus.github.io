import { Ball } from "/physics-sandbox/scripts/Ball.js";

export const canvasElem = document.getElementById('canvas');


requestAnimationFrame(gameLoop);

let ball1 = new Ball(canvasElem.width/2, 15, 15);

function gameLoop() {
    physics();
    update();
    draw();

    requestAnimationFrame(gameLoop);
}


function physics() {
    ball1.physics();
}


function update() {

    ball1.update();
}

function draw() {

    const ctx = canvasElem.getContext('2d');
    
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

    ball1.draw(ctx);
}





function distanceDetection(x1, x2, y1, y2) {
    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);

    return Math.sqrt(a * a + b * b);
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


