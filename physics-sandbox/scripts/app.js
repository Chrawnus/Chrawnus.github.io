import { Ball } from "/physics-sandbox/scripts/Ball.js";
//import { Platform } from "/physics-sandbox/scripts/Platform.js";
import { PhysicsWorld } from "/physics-sandbox/scripts/PhysicsWorld.js";

export const canvasElem = document.getElementById('canvas');

let prevTime;
let accumulator = 0;

let gameObjects = [];
let collisionSectors = {
    "sector1": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": 0, "y": 0},
    "sector2": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4), "y": 0},
    "sector3": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*2, "y": 0},
    "sector4": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*3, "y": 0},
    "sector5": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": 0, "y": (canvasElem.height/4)},
    "sector6": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4), "y": (canvasElem.height/4)},
    "sector7": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*2, "y": (canvasElem.height/4)},
    "sector8": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*3, "y": (canvasElem.height/4)},
    "sector9": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": 0, "y": (canvasElem.height/4)*2},
    "sector10": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4), "y": (canvasElem.height/4)*2},
    "sector11": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*2, "y": (canvasElem.height/4)*2},
    "sector12": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*3, "y": (canvasElem.height/4)*2},
    "sector13": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": 0, "y": (canvasElem.height/4)*3},
    "sector14": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4), "y": (canvasElem.height/4)*3},
    "sector15": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*2, "y": (canvasElem.height/4)*3},
    "sector16": {"width": canvasElem.width/4, "height": canvasElem.height/4, "x": (canvasElem.width/4)*3, "y": (canvasElem.height/4)*3},
}

let collisionIndex = Object.keys(collisionSectors);

const world = new PhysicsWorld();

for (let i = 0; i < 500; i++) {
    gameObjects.push(new Ball(getRandomInt(15, canvasElem.width - 15), getRandomInt(15, canvasElem.height - 15), 0.4, 2));
    //gameObjects.push(new Ball(getRandomInt(15, canvasElem.width - 15), getRandomInt(15, canvasElem.height - 15), getRandomInt(50,100), 25));
}

world.add(gameObjects);


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

function physics(dt) {
    getPhysicsDelta(dt);
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
    for (let i = 0; i < collisionIndex.length; i++) {
        ctx.beginPath();
        ctx.rect(collisionSectors[collisionIndex[i]].x, collisionSectors[collisionIndex[i]].y, collisionSectors[collisionIndex[i]].width, collisionSectors[collisionIndex[i]].height)
        ctx.stroke();
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
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}

function getPhysicsDelta(dt) {
    let pdt = 0.01;
    accumulator += dt;

    while (accumulator >= pdt) {

        world.physics(pdt);
        accumulator -= pdt;

    }
}
