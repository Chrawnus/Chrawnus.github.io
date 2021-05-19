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
let exploredNodes = [];
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




    enemyMove(dt);

    moveCollideX(enemyRect.vx, enemyRect, obstacles, onCollideX);
    moveCollideY(enemyRect.vy, enemyRect, obstacles, onCollideY);
    getNewEnemyTarget();
    getEntityPosOnTileGrid(enemyRect, tileGrid);
    getPathToPlayer(tileGrid, pathToPlayer);

};

function getNewEnemyTarget() {
    if (enemyRect.target === undefined) {
        enemyRect.target = nodeToExplore;
    }

    if (enemyRect.target !== undefined && getDistanceBetweenPoints(enemyRect.x, enemyRect.y, enemyRect.target.x, enemyRect.target.y) < 1) {

        enemyRect.target = nodeToExplore;
    }
}



function placeEnemy() {
    enemyRect.x = startPos.x;
    enemyRect.y = startPos.y;
    enemyRect.placed = 1;
}

export function enemyMove(dt) {
    if (exploredNodes.length > 0) {
        let enemyX = enemyRect.x + enemyRect.width / 2;
        let enemyY = enemyRect.y + enemyRect.height / 2;
        let tileX = exploredNodes[0].x + exploredNodes[0].width / 2;
        let tileY = exploredNodes[0].y + exploredNodes[0].height / 2;

        if (getDistanceBetweenPoints(enemyX, enemyY, tileX, tileY) > 5) {
            const dx = (tileX) - enemyX;
            const dy = (tileY) - enemyY;
            const angle = Math.atan2(dy, dx);
            enemyRect.vx = enemyRect.speed * Math.cos(angle) * dt;
            enemyRect.vy = enemyRect.speed * Math.sin(angle) * dt;
        } else if (getDistanceBetweenPoints(enemyX, enemyY, tileX, tileY) <= 5) {
            exploredNodes[0].color = "green";
            exploredNodes.length = 0;
        } 
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


    const startTile = pathToPlayer[0];
    const goalTile = pathToPlayer[pathToPlayer.length - 1];

    if (nodeToExplore === undefined) {
        nodeToExplore = startTile;
    }

        const northCost = getCost(startTile, tileGrid[nodeToExplore.nodes.north], goalTile);
        const eastCost = getCost(startTile, tileGrid[nodeToExplore.nodes.east], goalTile);
        const southCost = getCost(startTile, tileGrid[nodeToExplore.nodes.south], goalTile);
        const westCost = getCost(startTile, tileGrid[nodeToExplore.nodes.west], goalTile);

        let costArr = [];
        if (northCost !== undefined) {
            costArr.push(northCost)
        }
        if (eastCost !== undefined) {
            costArr.push(eastCost)
        }
        if (southCost !== undefined) {
            costArr.push(southCost)
        }
        if (westCost !== undefined) {
            costArr.push(westCost)
        }


        const direction = (costArr.indexOf(Math.min(...costArr)));
        
        if (direction === 0) {
            nodeToExplore.color = "red"
            exploredNodes.push(nodeToExplore);
            nodeToExplore = tileGrid[nodeToExplore.nodes.north];
            
        }
        if (direction === 1) {
            nodeToExplore.color = "red"
            exploredNodes.push(nodeToExplore);
            nodeToExplore = tileGrid[nodeToExplore.nodes.east];
            
        }
        if (direction === 2) {
            nodeToExplore.color = "red"
            exploredNodes.push(nodeToExplore);
            nodeToExplore = tileGrid[nodeToExplore.nodes.south];
            
        }
        if (direction === 3) {
            nodeToExplore.color = "red"
            exploredNodes.push(nodeToExplore);
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

    return getDistanceBetweenPoints(nodeX, nodeY, goalX, goalY) + getDistanceBetweenPoints(startX, startY, nodeX, nodeY);
}

function getStartAndEndNodes(pathToPlayer) {
    pathToPlayer[0] = tileGrid[enemyRect.currentInhabitedTile];
    pathToPlayer[pathToPlayer.length - 1] = tileGrid[playerRect.currentInhabitedTile];

}

