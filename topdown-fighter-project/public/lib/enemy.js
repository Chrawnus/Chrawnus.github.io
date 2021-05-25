import { tileGridSize, tileGrid, tileSize, visibleTileGrid, floodGrid } from "./tilegrid.js";
import { getEntityPosOnTileGrid, getDistanceBetweenPoints } from "./helperFunctions.js";
import { playerRect } from "./player.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";
import { MinHeap } from "./minHeap.js";


let elapsed;
export const startPos = {
    x: 640,
    y: 640
}



let pathToPlayer = [];

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

export function updateEnemy(dt, now) {

    if (elapsed === undefined) {
        elapsed = dt;
    } else {
        elapsed += dt;

    }


    enemyRect.vx = 0;
    enemyRect.vy = 0;
    if (enemyRect.placed === 0) {
        placeEnemy();
    }
    getEntityPosOnTileGrid(enemyRect, tileGrid);

    if (pathToPlayer === undefined || pathToPlayer.length === 0 || elapsed > 0.3) {
        pathToPlayer = pathFinding(enemyRect, playerRect, heuristic);
        elapsed = 0;
    }

    if (elapsed > 0.4) {
        elapsed = 0;
    }

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

    if (!(pathToPlayer === undefined) && pathToPlayer.length > 1) {
        let last = pathToPlayer.length - 2;
        const enemyX = enemyRect.x + enemyRect.width / 2;
        const enemyY = enemyRect.y + enemyRect.height / 2;
        let targetX = pathToPlayer[last].x + pathToPlayer[last].width / 2;
        let targetY = pathToPlayer[last].y + pathToPlayer[last].height / 2;
        if (getDistanceBetweenPoints(enemyX, enemyY, targetX, targetY) < 10) {
            if (pathToPlayer.length > 2) {
                pathToPlayer.splice(last, 1);
            }

        } else {
            last = pathToPlayer.length - 2;
            targetX = pathToPlayer[last].x + pathToPlayer[last].width / 2;
            targetY = pathToPlayer[last].y + pathToPlayer[last].height / 2;
            const dx = targetX - enemyX;
            const dy = targetY - enemyY;
            const angle = Math.atan2(dy, dx)
            enemyRect.vx = enemyRect.speed * Math.cos(angle) * dt;
            enemyRect.vy = enemyRect.speed * Math.sin(angle) * dt;
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

function pathFinding(start, goal, heuristic) {

    

    const startTile = tileGrid[start.currentInhabitedTile];
    const goalTile = tileGrid[goal.currentInhabitedTile];

    const openList = new MinHeap();
    const closedList = [];
    const cameFrom = new Map();

    const gScore = new Map();
    gScore.set(startTile, 0);

    const fScore = new Map();
    fScore.set(startTile, gScore.get(startTile) + heuristic(startTile, goalTile));
    openList.push(startTile, fScore);
    const cost = 1;

    while (openList.heap.length > 0) {
        
        //  current = remove lowest rank item from OPEN
        //add current to CLOSED

        let current = openList.heap[0].value;
        closedList.push(openList.pop());

        if (closedList[closedList.length - 1].value === goalTile) {
            
            const totalPath = reconstructPath(cameFrom, current);
            return totalPath;
        }

        
        //for neighbors of current:
        for (let i = 0; i < current.nodes.length; i++) {
            const tile = current.nodes[i];
            if (tile === undefined || closedList.filter(e => e.index === tile.index).length > 0) {
                continue;
            }


            const initialGScore = gScore.get(current) + cost;

            if (gScore.get(tile) === undefined) {

                gScore.set(tile, tile.gScore);
                cameFrom.set(tile, current);
                if (initialGScore < gScore.get(tile)) {
                    cameFrom.set(tile, current);
                    gScore.set(tile, initialGScore);
                    const h = heuristic(tile, goalTile);

                    fScore.set(tile, gScore.get(tile) + h);

                    if (!openList.exists(tile)) {
                        openList.push(tile, fScore.get(tile));
                    }
                }
            }
        }
    }

    return;
}

function heuristic(nodeToExplore, goalTile) {
    const nodeX = nodeToExplore.x + nodeToExplore.width / 2;
    const nodeY = nodeToExplore.y + nodeToExplore.height / 2;

    const goalX = goalTile.x + goalTile.width / 2;
    const goalY = goalTile.y + goalTile.height / 2;

    const dx = Math.abs(nodeX - goalX);
    const dy = Math.abs(goalY - nodeY);
    const D = 1;
    const D2 = 1.4;
    //return D * (dx + dy);
    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)

}


function reconstructPath(cameFrom, current) {

    pathToPlayer = [];
    const totalPath = [current]

    while (cameFrom.get(current) !== undefined) {

        current = cameFrom.get(current);
        totalPath.push(current);
    }

    return totalPath;
}

function getStartAndEndNodes(pathToPlayer) {
    pathToPlayer[0] = tileGrid[enemyRect.currentInhabitedTile];
    pathToPlayer[pathToPlayer.length - 1] = tileGrid[playerRect.currentInhabitedTile];

}

