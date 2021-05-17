import { tileGridSize, tileGrid, tileSize, visibleTileGrid } from "./tilegrid.js";
import { getEntityPosOnTileGrid } from "./helperFunctions.js";
import { playerRect } from "./player.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";


export const startPos = {
    x: 640,
    y: 640
}

let pathToPlayer = [undefined, undefined];

export const enemyRect = {
    x: startPos.x,
    y: startPos.y,
    placed: 0,
    width: tileSize * 0.8,
    height: tileSize * 0.8,
    currentInhabitedTile: undefined,
    color: 'red',
    speed: 200,
    storedAttacks: 4,
    startingAttackDelay: 300,
    attackDelay: 300,

    vx: 0,
    vy: 0,
};

export function updateEnemy(dt) {
    enemyRect.vx = 0;
    enemyRect.vy = 0;
    if (enemyRect.placed === 0) {
        placeEnemy();
    }

    EnemyAttack(dt);
    enemyMove(dt);

    moveCollideX(enemyRect.vx, enemyRect, obstacles, onCollideX);
    moveCollideY(enemyRect.vy, enemyRect, obstacles, onCollideY);
    getEntityPosOnTileGrid(enemyRect, tileGrid);
    getPathToPlayer(tileGrid, pathToPlayer);
};

export function getEnemyPos(canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (enemyRect.x - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (enemyRect.y - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function placeEnemy() {
    enemyRect.x = startPos.x;
    enemyRect.y = startPos.y;
    enemyRect.placed = 1;
}

export function enemyMove(dt) {
    const dx = playerRect.x - enemyRect.x;
    const dy = playerRect.y - enemyRect.y;
    const angle = Math.atan2(dy, dx);

    enemyRect.vx = enemyRect.speed * Math.cos(angle) * dt;
    enemyRect.vy = enemyRect.speed * Math.sin(angle) * dt;


}

export function EnemyAttack(dt) {


    
}

function onCollideX(rect, otherRect) {
    enemyRect.vx = 0;
    return true;
}

function onCollideY(rect, otherRect) {
    enemyRect.vy = 0;
    return true;
}

function getPathToPlayer(tileGrid, pathToPlayer) {
    getStartAndEndNodes(pathToPlayer);
}

function getStartAndEndNodes(pathToPlayer) {
    pathToPlayer[0] = enemyRect.currentInhabitedTile
    pathToPlayer[pathToPlayer.length - 1] = playerRect.currentInhabitedTile

}

