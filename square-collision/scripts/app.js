import { Square } from "./square.js";


export const canvasElem = document.getElementById('canvas');

let prevTime;
let accumulator = 0;

let squares = [];

for (let i = 0; i <= 4; i++) {
    squares.push(new Square(150*i, 0, 10*i, 10**i, -50));
}

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    let dt = getDelta(now);

    update(dt);
    
    physics(dt);
    draw(dt);

    requestAnimationFrame(gameLoop);
}


function update(dt) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].update(dt);
    }
}

function physics(dt) {
    getPhysicsDelta(dt);
}

function draw() {
    const ctx = canvasElem.getContext('2d');

    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

    for (let i = 0; i < squares.length; i++) {
        squares[i].draw(ctx);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

function getPhysicsDelta(dt) {
    let pdt = 0.01;
    accumulator += dt;

    while (accumulator >= pdt) {

        //world.physics(pdt);
        accumulator -= pdt;

    }
}
