import { tileGrid, tileSize } from "./tilegrid.js";
import { getEntityPosOnTileGrid } from "./helperFunctions.js";
import { getKey, keyCodes } from "./input.js";
import { attackBox, createAttackBox, updateAttackBox } from "./playerAttackBox.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";
import { enemyRect } from "./enemy.js";

export const inputBuffer = [];

export const playerRect = {
    x: 0,
    y: 0,
    width: tileSize * 0.8,
    height: tileSize * 0.8,
    maxHealth: 100,
    health: 100,
    initialAttack: 2.5,
    attack: 2.5,
    currentInhabitedTile: undefined,
    color: 'lime',
    speed: 150,
    storedAttacks: 4,
    startingAttackDelay: 25,
    attackDelay: 25,
    vx: 0,
    vy: 0,
    kills: 0,
    deaths: 0,
    healthBoost: 10
};

export function updatePlayer(dt) {
    playerRect.vx = 0;
    playerRect.vy = 0;


    if (playerRect.health > 0) {
        playerAttack(dt);
        updateAttackBox(dt);
        inputBufferUpdate(dt);
        playerMove(dt);
    }

    
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

function playerMove(dt) {
    playerRect.vy -= getKey(keyCodes.w) || getKey(keyCodes.W) ? playerRect.speed * dt : 0;
    playerRect.vx -= getKey(keyCodes.a) || getKey(keyCodes.A) ? playerRect.speed * dt : 0;
    playerRect.vy += getKey(keyCodes.s) || getKey(keyCodes.S) ? playerRect.speed * dt : 0;
    playerRect.vx += getKey(keyCodes.d) || getKey(keyCodes.D) ? playerRect.speed * dt : 0;
}

function playerAttack(dt) {

    // multidirectional attack
    if (inputBuffer.length < playerRect.storedAttacks && getKey(keyCodes.shift)) {
        checkAttackDirection();   
    }

    // regular attack
    if (inputBuffer.length < 1 && !getKey(keyCodes.shift)) {
        checkAttackDirection();
    }

    function checkAttackDirection() {
        getKey(keyCodes.arrowUp) ? storeInput('arrowUp') : 0;
        getKey(keyCodes.arrowRight) ? storeInput('arrowRight') : 0;
        getKey(keyCodes.arrowDown) ? storeInput('arrowDown') : 0;
        getKey(keyCodes.arrowLeft) ? storeInput('arrowLeft') : 0;
    }

    function storeInput(slashDirection) {
        if (!inputBuffer.includes(slashDirection)) {
            inputBuffer.push(slashDirection);
            playerRect.attackDelay = playerRect.startingAttackDelay;
        } else {
            return;
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


