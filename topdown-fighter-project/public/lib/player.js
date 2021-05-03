import { canvasMiddle } from "./canvas.js";
import { tileGridSize, tileGrid, tileSize } from "./tilegrid.js";
import { getKey, keyCodes } from "./input.js";
import { attackBox, createAttackBox } from "./playerAttackBox.js";

export const startPos = {
    x: 0,
    y: 0
}


export function setPlayerStartPosition() {
    const x = tileGrid[Math.sqrt(tileGridSize)/2].x
    const y = tileGrid[tileGridSize/2].y
    startPos.x = x;
    startPos.y = y;
}

export const playerRect = {
    x: startPos.x,
    y: startPos.y,
    placed: 0,
    width: tileSize*0.8,
    height: tileSize*0.8,
    color: 'lime',
    speed: 150,
    startingAttackDelay: 800,
    attackDelay: 800,
    vx: 0,
    vy: 0,
};

export function getPlayerPos(canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (playerRect.x - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (playerRect.y - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

export function playerMove(dt) {
    playerRect.vx -= getKey(keyCodes.a) ? playerRect.speed * dt : 0;
    playerRect.vx += getKey(keyCodes.d) ? playerRect.speed * dt : 0;
    playerRect.vy += getKey(keyCodes.s) ? playerRect.speed * dt : 0;
    playerRect.vy -= getKey(keyCodes.w) ? playerRect.speed * dt : 0;
}

export function playerAttack(dt) {
    if (!attackBox.isActive) {
        if (getKey(keyCodes.arrowUp) && playerRect.attackDelay > 0) {
            playerRect.attackDelay -= dt * 1000;
        } else if (getKey(keyCodes.arrowUp) && playerRect.attackDelay <= 0) {
            console.log('attack up');
            createAttackBox('up');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
        if (getKey(keyCodes.arrowRight) && playerRect.attackDelay > 0) {
            playerRect.attackDelay -= dt * 1000;
        } else if (getKey(keyCodes.arrowRight) && playerRect.attackDelay <= 0) {
            console.log('attack right');
            createAttackBox('right');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
        if (getKey(keyCodes.arrowDown) && playerRect.attackDelay > 0) {
            playerRect.attackDelay -= dt * 1000;
        } else if (getKey(keyCodes.arrowDown) && playerRect.attackDelay <= 0) {
            console.log('attack down');
            createAttackBox('down');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
        if (getKey(keyCodes.arrowLeft) && playerRect.attackDelay > 0) {
            playerRect.attackDelay -= dt * 1000;
        } else if (getKey(keyCodes.arrowLeft) && playerRect.attackDelay <= 0) {
            console.log('attack left');
            createAttackBox('left');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
    }

}


