import { rectanglesIntersect } from "./helperFunctions.js";
import { canvas } from "./canvas.js";
import { startPos, playerRect, getPlayerPos, playerAttack, playerMove } from "./player.js";
import { getKey, keyCodes } from "./input.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { camera } from "./camera.js";
import { obstacles, visibleObstacles, tileGridSize, tileGrid, visibleTileGrid } from "./tilegrid.js";
import { updateAttackBox } from "./playerAttackBox.js";



export const drawDistance = {
    x: playerRect.x + playerRect.width / 2 - (canvas.width * 1.5) / 2,
    y: playerRect.y + playerRect.height / 2 - (canvas.height * 1.5) / 2,
    height: canvas.height * 2,
    width: canvas.width * 2
};


export function update(dt, now) {
    updatePlayer(dt, now);
    updateView();
    updateCamera();
    manageVisiblePlatforms();
}


function updatePlayer(dt, now) {
    
    placePlayer();

    playerRect.vx = 0;
    playerRect.vy = 0;

    updateAttackBox(dt);
    playerMove(dt);
    playerAttack(dt);
    
    
    moveCollideX(playerRect.vx, playerRect, obstacles, onCollideX);
    moveCollideY(playerRect.vy, playerRect, obstacles, onCollideY);
};

function placePlayer() {
    if (playerRect.placed === 0) {
        playerRect.x = startPos.x;
        playerRect.y = startPos.y;
        playerRect.placed = 1;
    }
}

function updateView() {
    if (getKey(keyCodes.z)) {
        drawDistance.height *= 1.05;
        drawDistance.width *= 1.05;
    }
    if (getKey(keyCodes.x)) {
        drawDistance.height *= 0.96;
        drawDistance.width *= 0.96;
    }
    drawDistance.x = (playerRect.x + 0.5 * playerRect.width) - drawDistance.width / 2;
    drawDistance.y = (playerRect.y + 0.5 * playerRect.height) - drawDistance.height / 2;
}

export function updateCamera() {
    const playerPosCanvas = getPlayerPos(canvas);

    if (playerPosCanvas.x > tileGridSize && playerPosCanvas.x < tileGridSize) {
        camera.x = playerRect.x - tileGridSize;
    }

    if (playerPosCanvas.y < canvas.height && playerPosCanvas.y > 0 + canvas.height) {
        camera.y = playerRect.y - canvas.height;
    } else if (playerPosCanvas.y < canvas.height) {
        camera.y = -32;
    }
}

export function manageVisiblePlatforms() {
    for (let i = 0; i < obstacles.length; i++) {
        const tile = obstacles[i];
        const tileIsNotInArray = !(visibleObstacles.filter(e => e.x === tile.x && e.y === tile.y).length > 0);
        if (rectanglesIntersect(tile, drawDistance) && tileIsNotInArray) {
            visibleObstacles.push(tile);
        } else if ((!rectanglesIntersect(tile, drawDistance) && !tileIsNotInArray)) {
            visibleObstacles.splice(visibleObstacles.indexOf(tile), 1);
        }
    }

    for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];
        const tileIsNotInArray = !(visibleTileGrid.filter(e => e.x === tile.x && e.y === tile.y).length > 0);
        if (rectanglesIntersect(tile, drawDistance) && tileIsNotInArray) {
            visibleTileGrid.push(tile);
        } else if (!rectanglesIntersect(tile, drawDistance) && !tileIsNotInArray) {
            visibleTileGrid.splice(visibleTileGrid.indexOf(tile), 1);
        }

    }
}


export function onCollideX(rect, otherRect) {
    playerRect.vx = 0;
    return true;
}

export function onCollideY(rect, otherRect) {
    playerRect.vy = 0;
    return true;
}


