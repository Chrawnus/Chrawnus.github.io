import { tileGridSize, tileGrid, tileSize, visibleTileGrid, floodGrid } from "./tilegrid.js";
import { getEntityPosOnTileGrid } from "./helperFunctions.js";
import { getKey, keyCodes } from "./input.js";
import { attackBox, createAttackBox, updateAttackBox } from "./playerAttackBox.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";
import { enemyRect } from "./enemy.js";

const intersectingTiles = [];

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
    maxHealth: 100,
    health: 100,
    currentInhabitedTile: undefined,
    color: 'lime',
    speed: 150,
    storedAttacks: 4,
    startingAttackDelay: 300,
    attackDelay: 300,
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
    
    moveCollideX(playerRect.vx, playerRect, enemyRect, onCollideX);
    moveCollideY(playerRect.vy, playerRect, enemyRect, onCollideY);

    getEntityPosOnTileGrid(playerRect, tileGrid);



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
    if (inputBuffer.length < playerRect.storedAttacks && getKey(keyCodes.shift)) {
        multiDirectionalSlash();
    }
    if (inputBuffer.length < 1 && !getKey(keyCodes.shift)) {
        attackSlash();
    }

    function multiDirectionalSlash() {
        if (getKey(keyCodes.arrowUp) && !(inputBuffer.includes('up'))) {
            inputBuffer.push('up');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }

        if (getKey(keyCodes.arrowRight) && !(inputBuffer.includes('right'))) {
            inputBuffer.push('right');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
        if (getKey(keyCodes.arrowDown) && !(inputBuffer.includes('down'))) {
            inputBuffer.push('down');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }

        if (getKey(keyCodes.arrowLeft) && !(inputBuffer.includes('left'))) {
            inputBuffer.push('left');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
    }

    function attackSlash() {
        if (getKey(keyCodes.arrowUp)) {
            inputBuffer.push('up');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }

        if (getKey(keyCodes.arrowRight)) {
            inputBuffer.push('right');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }
        if (getKey(keyCodes.arrowDown)) {
            inputBuffer.push('down');
            playerRect.attackDelay = playerRect.startingAttackDelay;
        }

        if (getKey(keyCodes.arrowLeft)) {
            inputBuffer.push('left');
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
            inputBuffer.splice(0, 1);
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


