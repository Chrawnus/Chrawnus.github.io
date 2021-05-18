import { tileGridSize, tileGrid, tileSize, visibleTileGrid } from "./tilegrid.js";
import { getEntityPosOnTileGrid, getDistanceBetweenPoints } from "./helperFunctions.js";
import { playerRect } from "./player.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";


export const startPos = {
    x: 640,
    y: 640
}

let nodeToExplore;
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
    target: undefined,
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
    getNewEnemyTarget();
    enemyMove(dt);

    moveCollideX(enemyRect.vx, enemyRect, obstacles, onCollideX);
    moveCollideY(enemyRect.vy, enemyRect, obstacles, onCollideY);
    getEntityPosOnTileGrid(enemyRect, tileGrid);

    getPathToPlayer(tileGrid, pathToPlayer);
};

function getNewEnemyTarget() {
    if (enemyRect.target === undefined) {
        enemyRect.target = nodeToExplore;
    }
   
    if (enemyRect.target !== undefined && getDistanceBetweenPoints(enemyRect.x, enemyRect.y, enemyRect.target.x, enemyRect.target.y) < 5) {
        enemyRect.target = nodeToExplore;
    }
}

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
    if (enemyRect.target !== undefined) {
        const dx = (enemyRect.target.x + enemyRect.target.width/2) - enemyRect.x;
        const dy = (enemyRect.target.y + enemyRect.target.height/2) - enemyRect.y;
        const angle = Math.atan2(dy, dx);
    
        enemyRect.vx = enemyRect.speed * Math.cos(angle) * dt;
        enemyRect.vy = enemyRect.speed * Math.sin(angle) * dt;
    }


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
    let exploredNodes = [];

    const startTile = tileGrid[enemyRect.currentInhabitedTile];
    const goalTile = tileGrid[playerRect.currentInhabitedTile];
    if (nodeToExplore === undefined) {
        nodeToExplore = startTile;
    }

    const northCost = getCost(startTile, tileGrid[nodeToExplore.nodes.north], goalTile);
    const eastCost = getCost(startTile, tileGrid[nodeToExplore.nodes.east], goalTile);
    const southCost = getCost(startTile, tileGrid[nodeToExplore.nodes.south], goalTile);
    const westCost = getCost(startTile, tileGrid[nodeToExplore.nodes.west], goalTile); 

    const costArr = [northCost, eastCost, southCost, westCost];
    const direction = (costArr.indexOf(Math.min(...costArr)))
    if (direction === 0) {
        nodeToExplore = tileGrid[nodeToExplore.nodes.north];
    }
    if (direction === 1) {
        nodeToExplore = tileGrid[nodeToExplore.nodes.east];
    }
    if (direction === 2) {
        nodeToExplore = tileGrid[nodeToExplore.nodes.south];
    }
    if (direction === 3) {
        nodeToExplore = tileGrid[nodeToExplore.nodes.west];
    }
}

function getCost(startTile, nodeToExplore, goalTile) {
    if (nodeToExplore === undefined) {
        return;
    }
    const startX = startTile.x + startTile.width / 2;
    
    const startY = startTile.y + startTile.height / 2;
    
    const nodeX = nodeToExplore.x + nodeToExplore.width / 2;
    
    const nodeY = nodeToExplore.y + nodeToExplore.height / 2;
    
    const goalX = goalTile.x + goalTile.width / 2;
    const goalY = goalTile.y + goalTile.height / 2;

    return getDistanceBetweenPoints(startX, startY, nodeX, nodeY) + getDistanceBetweenPoints(nodeX, nodeY, goalX, goalY);
}

function getStartAndEndNodes(pathToPlayer) {
    pathToPlayer[0] = enemyRect.currentInhabitedTile
    pathToPlayer[pathToPlayer.length - 1] = playerRect.currentInhabitedTile

}

