import { getKey, keyCodes } from "./input.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { platforms } from "./platforms.js";
import { camera } from "../app.js";

const startPos = {
    x: -200,
    y: 450 - 40
}

export const playerRect = {
    x: startPos.x,
    y: startPos.y,
    width: 40,
    height: 40
};



const gravity = 1;
const jumpStrength = -12.4;
const speed = 7.2;

const color = 'lime';

let vx = 0;
let vy = 0;
let grounded = false;

export function updatePlayer() {

    vx = 0;
    vx -= getKey(keyCodes.leftArrow) ? speed : 0;
    vx += getKey(keyCodes.rightArrow) ? speed : 0;


    vy += gravity;


    if (grounded && getKey(keyCodes.upArrow)) {
        vy = jumpStrength;
        grounded = false;
    }

    moveCollideX(vx, playerRect, platforms, onCollideX)
    moveCollideY(vy, playerRect, platforms, onCollideY)

    if (playerRect.y > 450 - playerRect.height) {
        playerRect.y = 450 - playerRect.height;
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
        playerRect.x - camera.x,
        playerRect.y - camera.y,
        playerRect.width,
        playerRect.height
    );
}


function onCollideX(rect, otherRect) {
    playerRect.x = startPos.x;
    playerRect.y = startPos.y;

    return false;
}

function onCollideY(rect, otherRect) {
    if (vy >= 0) {
        grounded = true;
    }
    vy = 0;

    return true;
}

