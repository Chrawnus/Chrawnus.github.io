import { getKey, keyCodes } from "./input.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { platforms } from "./platforms.js";


const startPos = {
    x: 64,
    y: 512
}

export const playerRect = {
    x: startPos.x,
    y: startPos.y,
    width: 24,
    height: 24
};



const gravity = 1;
const maxJumpStrength = -32;
let jumpStrength = -12;
const speed = 5;

const color = 'lime';

let vx = 0;
let vy = 0;
let grounded = false;

export function updatePlayer() {

    vx = 0;
    vx -= getKey(keyCodes.leftArrow) ? speed : 0;
    vx += getKey(keyCodes.rightArrow) ? speed : 0;


    vy += gravity;


    if (getKey(keyCodes.upArrow) && jumpStrength > maxJumpStrength) {
        jumpStrength -= maxJumpStrength/100;
        vy = jumpStrength;
        grounded = false;
    }

    moveCollideX(vx, playerRect, platforms, onCollideX)
    moveCollideY(vy, playerRect, platforms, onCollideY)


    if (playerRect.y > 1024 - playerRect.height) {
        playerRect.y = 1024 - playerRect.height;
        vy = 0;
        jumpStrength = -12;
        grounded = true;
    }
};

/** 
 * @param {CanvasRenderingContext2D} context 
 */
export function drawPlayer(context, camera) {
    context.fillStyle = color;
    context.fillRect(
        playerRect.x,
        playerRect.y,
        playerRect.width,
        playerRect.height
    );
}


function onCollideX(rect, otherRect) {
    getKey(keyCodes.z) ? platforms.splice(platforms.indexOf(otherRect), 1) : 0;
    vx = 0;
    vy = 0;
    jumpStrength = -12;
    return true;
}

function onCollideY(rect, otherRect) {
    getKey(keyCodes.z) ? platforms.splice(platforms.indexOf(otherRect), 1) : 0;
    if (vy >= 0) {
        jumpStrength = -12;
        grounded = true;
    }
    vy = 0;

    return true;
}

