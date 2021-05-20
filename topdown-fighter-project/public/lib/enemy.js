import { tileGridSize, tileGrid, tileSize, visibleTileGrid } from "./tilegrid.js";
import { getEntityPosOnTileGrid, getDistanceBetweenPoints } from "./helperFunctions.js";
import { playerRect } from "./player.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";
import { MinHeap } from "./minHeap.js";


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


    getPathToPlayer(tileGrid, pathToPlayer);

    enemyMove(dt);

    moveCollideX(enemyRect.vx, enemyRect, obstacles, onCollideX);
    moveCollideY(enemyRect.vy, enemyRect, obstacles, onCollideY);




};





function placeEnemy() {
    enemyRect.x = startPos.x;
    enemyRect.y = startPos.y;
    enemyRect.placed = 1;
}

export function enemyMove(dt) {

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
    getEntityPosOnTileGrid(enemyRect, tileGrid);
    getStartAndEndNodes(pathToPlayer);
    const startTile = pathToPlayer[0];
    const goalTile = pathToPlayer[pathToPlayer.length - 1];
    
    const openList = new MinHeap();
    openList.push(startTile, 0);
    const cameFrom = [];

    

    // while lowest rank in OPEN is not the GOAL:
    while (openList.heap[0] !== undefined) {
        //  current = remove lowest rank item from OPEN
        //add current to CLOSED


        const nodeToExplore = openList.pop().value;
        nodeToExplore.color = "green"
        cameFrom.push(nodeToExplore);
        if (nodeToExplore === goalTile) {
            break;
        }
        //for neighbors of current:
        for (let i = 0; i < nodeToExplore.nodes.length; i++) {
            if (nodeToExplore.nodes[i] !== undefined) {
                const tile = tileGrid[nodeToExplore.nodes[i]];
                //cost = g(current) + movementcost(current, neighbor)
                const cost = g(startTile, tile) + h(tile, goalTile);

                if (!(cameFrom.includes(tile))) {
                    tile.color = "red"
                    openList.push(tile, cost);
                }
            }
        }
    }






    
/* 
        if neighbor in OPEN and cost less than g(neighbor):
    remove neighbor from OPEN, because new path is better
    if neighbor in CLOSED and cost less than g(neighbor): ⁽²⁾
    remove neighbor from CLOSED
    if neighbor not in OPEN and neighbor not in CLOSED:
    set g(neighbor) to cost
    add neighbor to OPEN
    set priority queue rank to g(neighbor) + h(neighbor)
    set neighbor's parent to current */



}

function g(startTile, nodeToExplore) {
    if (nodeToExplore === undefined) {
        return;
    }
    const nodeX = nodeToExplore.x + nodeToExplore.width / 2;
    const nodeY = nodeToExplore.y + nodeToExplore.height / 2;

    const startX = startTile.x + startTile.width / 2;
    const startY = startTile.y + startTile.height / 2;

    return (Math.abs(startX - nodeX) + Math.abs(startY - nodeY));
}

function h(nodeToExplore, goalTile) {
    const nodeX = nodeToExplore.x + nodeToExplore.width / 2;
    const nodeY = nodeToExplore.y + nodeToExplore.height / 2;

    const goalX = goalTile.x + goalTile.width / 2;
    const goalY = goalTile.y + goalTile.height / 2;
    const dx = Math.abs(nodeX - goalX)
    const dy = Math.abs(nodeY - goalY)
    const D = nodeToExplore.width;
    return D * (dx + dy);
}


function getCostToGoal(nodeToExplore, goalTile) {
    if (nodeToExplore === undefined) {
        return;
    }
    const nodeX = nodeToExplore.x + nodeToExplore.width / 2;
    const nodeY = nodeToExplore.y + nodeToExplore.height / 2;

    const goalX = goalTile.x + goalTile.width / 2;
    const goalY = goalTile.y + goalTile.height / 2;
    
    return (Math.abs(nodeX - goalX) + Math.abs(nodeY - goalY));
}

function getStartAndEndNodes(pathToPlayer) {
    pathToPlayer[0] = tileGrid[enemyRect.currentInhabitedTile];
    pathToPlayer[pathToPlayer.length - 1] = tileGrid[playerRect.currentInhabitedTile];

}

