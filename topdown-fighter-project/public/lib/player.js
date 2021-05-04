import { tileGridSize, tileGrid, tileSize } from "./tilegrid.js";
import { getKey, keyCodes, keys } from "./input.js";
import { attackBox, createAttackBox, updateAttackBox } from "./playerAttackBox.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";


export const startPos = {
    x: 0,
    y: 0
}

export const inputBuffer = [];

export const playerRect = {
    x: startPos.x,
    y: startPos.y,
    placed: 0,
    width: tileSize * 0.8,
    height: tileSize * 0.8,
    color: 'lime',
    speed: 200,
    storedAttacks: 1,
    startingAttackDelay: 600,
    attackDelay: 600,

    vx: 0,
    vy: 0,
};

export function updatePlayer(dt) {
    playerRect.vx = 0;
    playerRect.vy = 0;
    if (playerRect.placed === 0) {
        placePlayer();
    }


    
    playerAttack(dt);
    updateAttackBox(dt);
    inputBufferUpdate(dt);
    
    
    playerMove(dt);
    moveCollideX(playerRect.vx, playerRect, obstacles, onCollideX);
    moveCollideY(playerRect.vy, playerRect, obstacles, onCollideY);
};

export function getPlayerPos(canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (playerRect.x - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (playerRect.y - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function placePlayer() {
        playerRect.x = startPos.x;
        playerRect.y = startPos.y;
        playerRect.placed = 1;
}

export function setPlayerStartPosition() {
    const x = tileGrid[Math.sqrt(tileGridSize) / 2].x
    const y = tileGrid[tileGridSize / 2].y
    startPos.x = x;
    startPos.y = y;
}

export function playerMove(dt) {
        playerRect.vy -= getKey(keyCodes.w) || getKey(keyCodes.W) ? playerRect.speed * dt : 0;
        playerRect.vx -= getKey(keyCodes.a) || getKey(keyCodes.A) ? playerRect.speed * dt : 0;
        playerRect.vy += getKey(keyCodes.s) || getKey(keyCodes.S) ? playerRect.speed * dt : 0;
        playerRect.vx += getKey(keyCodes.d) || getKey(keyCodes.D) ? playerRect.speed * dt : 0;     
}

export function playerAttack(dt) {
    if (inputBuffer.length < playerRect.storedAttacks) {
        if (getKey(keyCodes.arrowUp) && !(inputBuffer.includes('up'))) {
            console.log('attack up');
            inputBuffer.push('up');
            console.log(inputBuffer)
            console.log(inputBuffer.length)
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }

        if (getKey(keyCodes.arrowRight) && !(inputBuffer.includes('right'))) {
            console.log('attack right');
            inputBuffer.push('right');
            console.log(inputBuffer)
            console.log(inputBuffer.length)
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
        if (getKey(keyCodes.arrowDown) && !(inputBuffer.includes('down'))) {
            console.log('attack down');
            inputBuffer.push('down');
            console.log(inputBuffer)
            console.log(inputBuffer.length)
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }

        if (getKey(keyCodes.arrowLeft) && !(inputBuffer.includes('left'))) {
            console.log('attack left');
            inputBuffer.push('left');
            console.log(inputBuffer)
            console.log(inputBuffer.length)
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }

    }

}

export function inputBufferUpdate(dt) {
    if (inputBuffer.length > 0 && attackBox.isActive === false) {
        if (playerRect.attackDelay > 0) {
            playerRect.attackDelay -= dt * 1000;
        } else if (playerRect.attackDelay <= 0 && !getKey(keyCodes.shift)) {
            createAttackBox(inputBuffer[0]);
            inputBuffer.splice(0,1);
        }
        if (inputBuffer.length === 0) {
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
    }
}

function onCollideX(rect, otherRect) {
    playerRect.vx = 0;
    return true;
}

function onCollideY(rect, otherRect) {
    playerRect.vy = 0;
    return true;
}

