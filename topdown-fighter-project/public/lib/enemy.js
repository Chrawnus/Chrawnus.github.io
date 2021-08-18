import { tileGrid, tileSize } from "./tilegrid.js";
import { getEntityPosOnTileGrid, getDistanceBetweenPoints, intersectRect } from "./helperFunctions.js";
import { playerRect } from "./player.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";
import { pathFinding } from "./pathFinding.js";
import { attackBox } from "./playerAttackBox.js";

let elapsed;

export let pathToPlayer = [];

export const enemyRect = {
    x: 640,
    y: 640,
    width: tileSize * 0.8,
    height: tileSize * 0.8,
    maxHealth: 100,
    health: 100,
    attack: 50,
    currentInhabitedTile: undefined,
    color: 'red',
    initialSpeed: 100,
    speed: 100,
    knockback: 15,
    storedAttacks: 4,
    startingAttackDelay: 300,
    attackDelay: 300,
    target: undefined,
    vx: 0,
    vy: 0,
};

export function updateEnemy(dt) {

    increaseElapsed(dt);

    enemyRect.vx = 0;
    enemyRect.vy = 0;


    getEntityPosOnTileGrid(enemyRect, tileGrid);

    if (pathToPlayer === undefined || pathToPlayer.length === 0 || elapsed > 0.2) {
        pathToPlayer = pathFinding(enemyRect, playerRect, pathToPlayer);
        //elapsed = 0;
    }

    resetElapsed();

    enemyMove(dt);

    if (intersectRect(enemyRect, attackBox)) {
        onAttacked();
    }

    moveCollideX(enemyRect.vx, enemyRect, obstacles, onCollideX);
    moveCollideY(enemyRect.vy, enemyRect, obstacles, onCollideY);

    moveCollideY(enemyRect.vy, enemyRect, playerRect, onCollideY);
    moveCollideX(enemyRect.vx, enemyRect, playerRect, onCollideX);

};

function resetElapsed() {
    if (elapsed > 0.3) {
        elapsed = 0;
    }
}

export function enemyMove(dt) {
    if (!(pathToPlayer === undefined) && pathToPlayer.length > 1) {
        let last = pathToPlayer.length - 1;
        const enemyX = enemyRect.x + enemyRect.width / 2;
        const enemyY = enemyRect.y + enemyRect.height / 2;
        let targetX = pathToPlayer[last].x + pathToPlayer[last].width / 2;
        let targetY = pathToPlayer[last].y + pathToPlayer[last].height / 2;
        if (getDistanceBetweenPoints(enemyX, enemyY, targetX, targetY) < 10) {
            if (pathToPlayer.length > 2) {
                pathToPlayer.splice(last, 1);
            }
            else {
                EnemyAttack(playerRect, dt);
            }
            
        } else {
            last = pathToPlayer.length - 1;
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

function EnemyAttack(playerRect, dt) {
    if (playerRect.health > 0) {
        playerRect.health -= enemyRect.attack * dt;
    }
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
        enemyRect.health -= playerRect.attack;
        knockBack(attackBox.direction)
    }

}

function knockBack(attackDirection) {
    enemyRect.vy -= attackDirection === 'arrowUp' ? enemyRect.knockback : 0;
    enemyRect.vy += attackDirection === 'arrowDown' ? enemyRect.knockback : 0;
    enemyRect.vx -= attackDirection === 'arrowLeft' ? enemyRect.knockback : 0;
    enemyRect.vx += attackDirection === 'arrowRight' ? enemyRect.knockback : 0;

    return;
}

function increaseElapsed(dt) {
    if (elapsed === undefined) {
        elapsed = dt;
    } else {
        elapsed += dt;
    }
}
