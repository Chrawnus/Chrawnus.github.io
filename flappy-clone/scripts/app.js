const canvas = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const context = canvas.getContext("2d");

let x = 200;
let y = 200;
let width = 50;
let height = 50;
let vy = 0;
const gravity = 9.81;
const jumpStrength = 6;
let previousElapsed = 0;

canvas.addEventListener('mousedown', onCanvasClicked);

requestAnimationFrame(gameLoop);

function gameLoop(elapsed) {
    requestAnimationFrame(gameLoop);
    const deltaTime = (elapsed - previousElapsed) / 1000;
    previousElapsed = elapsed;


    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    vy += gravity * deltaTime;
    y += vy;
    

    context.fillStyle = "black";
    context.fillRect(x, y, width, height);


}

function onCanvasClicked() {
    vy = -jumpStrength;
}