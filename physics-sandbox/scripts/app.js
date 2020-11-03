import { Ball } from "/physics-sandbox/scripts/Ball.js";
//import { Platform } from "/physics-sandbox/scripts/Platform.js";
import { PhysicsWorld } from "/physics-sandbox/scripts/PhysicsWorld.js";

export const canvasElem = document.getElementById('canvas');

let prevTime;
let accumulator = 0;

let gameObjects = [];

const world = new PhysicsWorld();

//gameObjects.push(new Ball(canvasElem.width/2, 15, 15));
//gameObjects.push(new Ball(canvasElem.width/2, 200, 15, 15));
//gameObjects.push(canvasElem.width+30, canvasElem.height+30, 15);
for (let i = 0; i < 25; i++) {
    gameObjects.push(new Ball(getRandomInt(15, canvasElem.width-15), getRandomInt(15, canvasElem.height-15), getRandomInt(5, 50)));
    
}

world.add(gameObjects);

//export let platform1 = new Platform(canvasElem.width/2, 300, 100, 25);

requestAnimationFrame(gameLoop);

export let keyArr = [];

window.addEventListener("keydown", keyDownEventsHandler);
window.addEventListener("keyup", keyUpEventsHandler);

function gameLoop(now) {
    let dt = getDelta(now);

    update(dt);
    physics(dt);
    draw(dt);

    requestAnimationFrame(gameLoop);
}


function update(dt) {
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update(dt);
    } 
}

function physics(now) {
    getPhysicsDelta(now);
}

function draw() {
    const ctx = canvasElem.getContext('2d');
    
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

    //platform1.draw(ctx);
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw(ctx);
    } 
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function keyDownEventsHandler(e) {
    if (e.key.startsWith('Arrow')) {
        if (!(keyArr.includes(e.key))) {
            keyArr.push(e.key);
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

function getDelta(now) {
    if(!prevTime){prevTime=now;}
    let dt = (now - prevTime)/1000;
    prevTime = now;
    return dt;
}

function getPhysicsDelta(dt) {
    let pdt = 0.01;
    accumulator += dt;
    while (accumulator >= pdt) {
        world.physics(pdt, dt);
        accumulator -=pdt;
    }
}
