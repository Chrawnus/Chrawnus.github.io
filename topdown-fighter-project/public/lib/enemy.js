import { tileGrid, tileSize } from "./tilegrid.js";
import { getEntityPosOnTileGrid, getDistanceBetweenPoints, intersectRect } from "./helperFunctions.js";
import { playerRect } from "./player.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";
import { pathFinding } from "./pathFinding.js";
import { attackBox } from "./playerAttackBox.js";


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
    maxHealth: 100,
    health: 100,
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

    if (enemyRect.placed === 0 || enemyRect.health <= 0) {
        placeEnemy();
        enemyRect.health = enemyRect.maxHealth;
    }
    getEntityPosOnTileGrid(enemyRect, tileGrid);

    if (pathToPlayer === undefined || pathToPlayer.length === 0 || elapsed > 0.2) {
        pathToPlayer = pathFinding(enemyRect, playerRect, pathToPlayer);
        elapsed = 0;
    }

    if (elapsed > 0.3) {
        elapsed = 0;
    }

    enemyMove(dt);
    
    if (intersectRect(enemyRect, attackBox)) {
        onAttacked();
    }
    
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

function onAttacked() {
    if (enemyRect.health > 0) {
        enemyRect.health -= 2.5;
    }
    console.log(enemyRect.health);
}

