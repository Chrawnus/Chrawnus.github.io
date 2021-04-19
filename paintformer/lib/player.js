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



const gravity = 16;
const maxJumpStrength = -840;
let jumpStrength = -420;
const speed = 150;

const color = 'lime';

let vx = 0;
let vy = 0;
let grounded = false;

export function updatePlayer(dt) {

    vx = 0;
    vx -= getKey(keyCodes.leftArrow) ? speed * dt : 0;
    vx += getKey(keyCodes.rightArrow) ? speed * dt : 0;


    vy += gravity * dt;


    if (getKey(keyCodes.upArrow) && jumpStrength > maxJumpStrength) {
        jumpStrength -= maxJumpStrength/100;
        vy = jumpStrength * dt;
        grounded = false;
    }

    moveCollideX(vx, playerRect, platforms, onCollideX)
    moveCollideY(vy, playerRect, platforms, onCollideY)


    if (playerRect.y > 1024 - playerRect.height) {
        playerRect.y = 1024 - playerRect.height;
        vy = 0;
        jumpStrength = -420;
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
    vx = 0;
    vy = 0;
    jumpStrength = -420;
    return true;
}

function onCollideY(rect, otherRect) {
    if (vy >= 0) {
        jumpStrength = -420;
        grounded = true;
    }
    vy = 0;

    return true;
}

