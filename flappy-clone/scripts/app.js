const canvas = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const context = canvas.getContext("2d");

let alive = true;

let x = 200;
let y = 200;
let width = 50;
let height = 50;
let vy = 0;
const gravity = 9.81;
const jumpStrength = 6;
let previousElapsed = 0;

let pipes = [];
let pipeWidth = 100;
let pipeHeight = 1000;
let gapSize = 200;
let pipeSpeed = 200;

canvas.addEventListener('mousedown', onCanvasClicked);

spawnPipe();


requestAnimationFrame(gameLoop);

function gameLoop(elapsed) {
    if (!alive) {
        return;
    }
    requestAnimationFrame(gameLoop);
    const deltaTime = (elapsed - previousElapsed) / 1000;
    previousElapsed = elapsed;


    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    vy += gravity * deltaTime;
    y += vy;


    context.fillStyle = "black";
    context.fillRect(x, y, width, height);


    context.fillStyle = "green";
    
    for(let i = 0; i < pipes.length; i++) {
        const pipe = pipes[i];
      
        pipe.x -= pipeSpeed * deltaTime;
      
        context.fillStyle = 'green';
        context.fillRect(pipe.x, pipe.y, pipeWidth, pipeHeight);
      
        if(boxBoxOverlap(x, y, width, height, pipe.x, pipe.y, pipeWidth, pipeHeight)) {
          alive = false;
        }
      }

}

function onCanvasClicked() {
    vy = -jumpStrength;
}

function spawnPipe() {
    let bottomPipe = {
        x: 500,
        y: canvas.height / 2 + gapSize / 2,
    }

    let topPipe = {
        x: 500,
        y: canvas.height / 2 - gapSize / 2 - pipeHeight,
    }
    pipes.push(bottomPipe, topPipe);
}

function boxBoxOverlap(x1, y1, width1, height1, x2, y2, width2, height2) {
    return (
        x1 < x2 + width2 &&
        x1 + width1 > x2 &&
        y1 < y2 + height2 &&
        y1 + height1 > y2
    );
}