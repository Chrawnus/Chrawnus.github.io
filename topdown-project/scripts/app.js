import { PhysicsWorld } from "/topdown-project/scripts/PhysicsWorld.js";
import { Player } from "/topdown-project/scripts/Player.js";
import { Platform } from "/topdown-project/scripts/Platform.js";



export const canvasElem = document.getElementById('canvas');
export const canvasElemRect = canvasElem.getBoundingClientRect();




export const mousecoords = {
    x: 0,
    y: 0
};

canvasElem.addEventListener("click", () => {
    canvasElem.requestPointerLock();
})

let timeoutId;

document.addEventListener("mousemove", (evt) => {
    clearTimeout(timeoutId);
    const x = evt.movementX;
    const y = evt.movementY;
    mousecoords.x = x * 2;
    mousecoords.y = y * 2;  

    timeoutId = setTimeout(() => {
        mousecoords.x = 0;
        mousecoords.y = 0;
    }, 0);
});

let prevTime;
let accumulator = 0;

let player = [];

let staticObjects = [];




    player.push(new Player(getRandomInt(15, canvasElem.width - 15), getRandomInt(15, canvasElem.height - 15), 15));


for (let i = 0; i < 25; i++) {
    staticObjects.push(new Platform(getRandomInt(15, canvasElem.width - 15), getRandomInt(15, canvasElem.height - 15), getRandomInt(20, 60), getRandomInt(20, 60)));
}

let world = new PhysicsWorld();

world.add(player);
world.add(staticObjects);

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
    for (let i = 0; i < player.length; i++) {
        
        player[i].update(dt);
    }
}

function physics(dt) {
    getPhysicsDelta(dt);
}

function draw() {
    const ctx = canvasElem.getContext('2d');

    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "black";
    
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    
    ctx.save();
/*     let clippingPath = new Path2D();
    clippingPath = player[0].getClippingPath(ctx);
    void ctx.clip(clippingPath); */
    ctx.fillStyle = "gray";
    
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);
    


    for (let i = 0; i < staticObjects.length; i++) {
        staticObjects[i].draw(ctx);
    }

    for (let i = 0; i < player.length; i++) {
        player[0].draw(ctx);
    }
    ctx.restore();

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


function keyDownEventsHandler(e) {
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        if (!(keyArr.includes(e.key))) {
            keyArr.push(e.key);
        }
    }
}


function keyUpEventsHandler(e) {
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
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

        world.physics(pdt, dt);
        accumulator -= pdt;

    }
}

