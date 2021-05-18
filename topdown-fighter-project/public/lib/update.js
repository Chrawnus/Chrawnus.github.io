import { rectanglesIntersect } from "./helperFunctions.js";
import { canvas } from "./canvas.js";
import { playerRect, updatePlayer } from "./player.js";
import { getKey, keyCodes } from "./input.js";
import { updateCamera } from "./camera.js";
import { obstacles, visibleObstacles, tileGridSize, tileGrid, visibleTileGrid, tileSize } from "./tilegrid.js";
import { enemyRect, updateEnemy } from './enemy.js'



export const drawDistance = {
    x: playerRect.x + playerRect.width / 2 - (canvas.width * 1.5) / 2,
    y: playerRect.y + playerRect.height / 2 - (canvas.height * 1.5) / 2,
    height: tileSize * 5,
    width: tileSize * 5
};

export function update(dt, now) {
    updatePlayer(dt, now);
    updateEnemy(dt)
    updateCamera();
    updateView();
    manageVisiblePlatforms();

}

function updateView() {
    drawDistance.x = (playerRect.x + 0.5 * playerRect.width) - drawDistance.width / 2;
    drawDistance.y = (playerRect.y + 0.5 * playerRect.height) - drawDistance.height / 2;

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





