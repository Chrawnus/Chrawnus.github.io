import { Ball } from "/physics-sandbox/scripts/Ball.js";
import { Platform } from "/physics-sandbox/scripts/Platform.js";
import { Collision } from "/physics-sandbox/scripts/CollisionDetection.js";

export const canvasElem = document.getElementById('canvas');


let prevTime;
let accumulator = 0;

requestAnimationFrame(gameLoop);

export let platform1 = new Platform(canvasElem.width/2, 300, 100, 25);

export let ball1 = new Ball(canvasElem.width/2, 15, 15);
export let ball2 = new Ball(canvasElem.width/2, 200, 15, 15);



let collider = new Collision();

export let keyArr = [];



window.addEventListener("keydown", keyDownEventsHandler);
window.addEventListener("keyup", keyUpEventsHandler);





function gameLoop(now) {


    let dt = getDelta(now);

    physics(dt);
    update(dt);
    collision(dt);
    draw(dt);

    requestAnimationFrame(gameLoop);
}


function physics(now) {
    getPhysicsDelta(now);
    
}


function update(dt) {
    ball1.update(dt);
    ball2.update(dt);
    
}

function collision() {
    collider.physics(collider.physicsChildren);
}

function draw() {

    const ctx = canvasElem.getContext('2d');
    
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

    platform1.draw(ctx);
    ball1.draw(ctx);
    ball2.draw(ctx);
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
        ball1.physics(pdt);
        ball2.physics(pdt);

        accumulator -=pdt;
    }
}