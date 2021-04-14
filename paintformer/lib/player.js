import { getKey, keyCodes } from "./input.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { platforms } from "./platforms.js";


const startPos = {
    x: 120,
    y: 0 - 24
}

export const playerRect = {
    x: startPos.x,
    y: startPos.y,
    width: 24,
    height: 24
};



const gravity = 1;
let jumpStrength = -12.4;
const speed = 5;

const color = 'lime';

let vx = 0;
let vy = 0;
let grounded = false;
let dblJumpTimer = 30;
let wallJumpTimer = 50;

export function updatePlayer() {
    jumpStrength = -12.4;
    if (grounded) {
        dblJumpTimer = 30;
    }
    vx = 0;
    vx -= getKey(keyCodes.leftArrow) ? speed : 0;
    vx += getKey(keyCodes.rightArrow) ? speed : 0;


    vy += gravity;


    if (dblJumpTimer && getKey(keyCodes.upArrow)) {
        vy = jumpStrength;
        grounded = false;
        dblJumpTimer--;
    }

    moveCollideX(vx, playerRect, platforms, onCollideX)
    moveCollideY(vy, playerRect, platforms, onCollideY)


    if (playerRect.y > 1024 - playerRect.height) {
        playerRect.y = 1024 - playerRect.height;
        vy = 0;
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
    
    return true;
}

function onCollideY(rect, otherRect) {
    getKey(keyCodes.z) ? platforms.splice(platforms.indexOf(otherRect), 1) : 0;
    if (vy >= 0) {
        grounded = true;
    }
    vy = 0;

    return true;
}

