const canvasElem = document.getElementById('canvas');
const scoreElem = document.getElementById('score');

let score = 0;
let step = 1;
let keyArr = [];


scoreElem.textContent = `Score: ${score}`;

let player = new Player(canvasElem.width/2, canvasElem.height/2, 15);
let coin = new Coin(5);
let enemy = new Enemy(15);


let objMovement = {
    "Up": -player.velocity,
    "Down": player.velocity,
    "Left": -player.velocity,
    "Right": player.velocity,
}




    






window.addEventListener("keydown", keyDownEventsHandler);
window.addEventListener("keyup", keyUpEventsHandler);

requestAnimationFrame(gameLoop);



function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
}

function update() {
    player.update();
    enemy.update();
    coin.update();

}

function draw() {

    const ctx = canvasElem.getContext('2d');
    
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);


    coin.draw(ctx);
    player.draw(ctx);
    enemy.draw(ctx);
}

function keyDownEventsHandler(e) {
    if (e.key.startsWith('Arrow')) {
        if (!(keyArr.includes(e.key))) {
            keyArr.push(e.key);
            if ((keyArr.length > 2)) {
                keyArr.shift;
            }
        }
    }

}


function keyUpEventsHandler(e) {
    if (e.key.startsWith('Arrow')) {
        if ((keyArr.includes(e.key))) {
            keyArr.splice(keyArr.indexOf(e.key), 1);
        }
    }
}


/* function movementHandler() {
    if (keyArr.includes("ArrowUp") && (player.y > player.rad)) {
        player.y += objMovement.Up;
    }
    if (keyArr.includes("ArrowDown") && (player.y < (canvasElem.height - player.rad))) {
        player.y += objMovement.Down;
    }
    if (keyArr.includes("ArrowLeft") && (player.x > player.rad)) {
        player.x += objMovement.Left;
    }
    if (keyArr.includes("ArrowRight") && (player.x < (canvasElem.width - player.rad))) {
        player.x += objMovement.Right;
    }
} */


function collisionDetection(x1, x2, y1, y2) {
    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);

    return (Math.sqrt(a * a + b * b) <= player.rad);
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


