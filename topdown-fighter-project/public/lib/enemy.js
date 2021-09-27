import { getDistanceBetweenPoints, intersectRect } from "./helperFunctions.js";
import { player } from "./player.js";

export const enemyRect = {
    x: 640,
    y: 640,
    width: 32 * 0.8,
    height: 32 * 0.8,
    maxHealth: 100,
    health: 100,
    attack: 50,
    currentInhabitedTile: undefined,
    color: 'red',
    initialSpeed: 100,
    speed: 100,
    maxSpeed: 250,
    knockback: 15,
    startingAttackDelay: 300,
    attackDelay: 300,
    target: undefined,
    vx: 0,
    vy: 0,
    pathToPlayer: [],
};



export function updateEnemy(dt) {


    enemyRect.vx = 0;
    enemyRect.vy = 0;
    
    enemyMove(dt);

    if (intersectRect(enemyRect, player.attackBox)) {
        onAttacked();
    }





};



export function enemyMove(dt) {
    if (!(enemyRect.pathToPlayer === undefined) && enemyRect.pathToPlayer.length > 1) {  
        let last = enemyRect.pathToPlayer.length - 1;
        const enemyX = enemyRect.x + enemyRect.width / 2;
        const enemyY = enemyRect.y + enemyRect.height / 2;
        let targetX = enemyRect.pathToPlayer[last].x + enemyRect.pathToPlayer[last].width / 2;
        let targetY = enemyRect.pathToPlayer[last].y + enemyRect.pathToPlayer[last].height / 2;
        if (getDistanceBetweenPoints(enemyX, enemyY, targetX, targetY) < 10) {
            if (enemyRect.pathToPlayer.length > 2) {
                enemyRect.pathToPlayer.splice(last, 1);
            }
            else {
                EnemyAttack(player, dt);
            }
            
        } else {
            last = enemyRect.pathToPlayer.length - 1;
            targetX = enemyRect.pathToPlayer[last].x + enemyRect.pathToPlayer[last].width / 2;
            targetY = enemyRect.pathToPlayer[last].y + enemyRect.pathToPlayer[last].height / 2;
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

function onAttacked() {
    if (enemyRect.health > 0) {
        enemyRect.health -= player.attack;
        knockBack(player.attackBox.direction)
    }

}

function knockBack(attackDirection) {
    enemyRect.vy -= attackDirection === 'arrowUp' ? enemyRect.knockback : 0;
    enemyRect.vy += attackDirection === 'arrowDown' ? enemyRect.knockback : 0;
    enemyRect.vx -= attackDirection === 'arrowLeft' ? enemyRect.knockback : 0;
    enemyRect.vx += attackDirection === 'arrowRight' ? enemyRect.knockback : 0;

    return;
}

