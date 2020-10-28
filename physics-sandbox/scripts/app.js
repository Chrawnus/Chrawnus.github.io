import { Ball } from "/physics-sandbox/scripts/Ball.js";
import { Platform } from "/physics-sandbox/scripts/Platform.js";

export const canvasElem = document.getElementById('canvas');


let prevTime;
let accumulator = 0;

requestAnimationFrame(gameLoop);

export let platform1 = new Platform(canvasElem.width/2, 300, 100, 25);
let ball1 = new Ball(canvasElem.width/2, 15, 15);
export let keyArr = [];



window.addEventListener("keydown", keyDownEventsHandler);
window.addEventListener("keyup", keyUpEventsHandler);





function gameLoop(now) {


    let dt = getDelta(now);

    physics(dt);
    update(dt);
    draw(dt);

    requestAnimationFrame(gameLoop);
}


function physics(dt) {
    ball1.physics(dt);
}


function update(dt) {
    ball1.update(dt);
}

function draw(dt) {

    const ctx = canvasElem.getContext('2d');
    
    ctx.clearRect(0, 0, 600, 480);
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvasElem.width, canvasElem.height);

    platform1.draw(ctx);
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


function keyDownEventsHandler(e) {
    if (e.key.startsWith('Arrow')) {
        if (!(keyArr.includes(e.key))) {
            keyArr.push(e.key);
            if ((keyArr.length > 2)) {
                keyArr.shift();
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

function getDelta(now) {
    if(!prevTime){prevTime=now;}
    let dt = (now - prevTime)/1000;
    prevTime = now;
    accumulator += dt;
    while (accumulator >= dt) {
        accumulator -= dt;
        return dt;
    }   
}