const canvas = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const context = canvas.getContext("2d");

let alive = true;
let started = false;

let x = 200;
let y = 200;
let width = 50;
let height = 50;
let vy = 0;
const gravity = 700;
const jumpStrength = 400;
let previousElapsed = 0;

let pipes = [];
let pipeWidth = 100;
let pipeHeight = 1000;
let gapSize = 200;
let pipeSpeed = 200;
let pipeSpawnRate = 2;
let lastPipeSpawnTime = 0;

let score = 0;
let gameOverMessage = "Tryck på [SPACE] för att spela igen";

canvas.addEventListener('mousedown', onCanvasClicked);
window.addEventListener('keydown', onKeyDown);
//spawnPipe();


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

    if (started) {
        vy += gravity * deltaTime;
        y += vy * deltaTime;


        context.fillStyle = "black";
        context.fillRect(x, y, width, height);


        context.fillStyle = "green";

        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];

            if (pipe.x + pipeWidth < 0) {
                pipes.splice(pipes.indexOf(pipe), 1);
                console.log(pipes);
            }
            
            pipe.x -= pipeSpeed * deltaTime;

            context.fillStyle = 'green';
            context.fillRect(pipe.x, pipe.y, pipeWidth, pipeHeight);
            


            if (boxBoxOverlap(x, y, width, height, pipe.x, pipe.y, pipeWidth, pipeHeight)
                || y + height < 0
                || y > canvas.height) {
                alive = false;
            }

            if (i % 2 == 0 && pipes[i].x + pipeWidth < x && !pipes[i].hasGivenScore) {
                pipes[i].hasGivenScore = true;
                score++;
            }
        }

        if (elapsed > lastPipeSpawnTime) {
            spawnPipe();
            lastPipeSpawnTime = elapsed + pipeSpawnRate * 1000;
        }
    }



    context.fillStyle = 'black';
    context.font = 'bold 48px sans-serif';
    context.textAlign = 'center';
    context.fillText(score, canvas.width / 2, 100);

    if (alive === false) {
        context.fillStyle = 'black';
        context.font = 'bold 36px sans-serif';
        context.textAlign = 'center';
        context.fillText(gameOverMessage, canvas.width / 2, canvas.height / 2);
    }
}

function onCanvasClicked() {
    started = true;
    vy = -jumpStrength;
}

function spawnPipe() {
    const maxOffset = (canvas.height - gapSize) - 40;
    const yOffset = (-maxOffset / 2 + Math.random() * maxOffset);

    let bottomPipe = {
        x: 50 + canvas.width,
        y: canvas.height / 2 + gapSize / 2 + yOffset,
    }

    let topPipe = {
        x: 50 + canvas.width,
        y: canvas.height / 2 - gapSize / 2 - pipeHeight + yOffset,
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

function onKeyDown(e) {
    if(e.keyCode === 32) {
        started = false;
        score = 0;
        alive = true;
        x = 150;
        y = 200;
        vy = 0;
        while(pipes.length > 0) {
          pipes.shift();
        }
        requestAnimationFrame(gameLoop);
      }

}