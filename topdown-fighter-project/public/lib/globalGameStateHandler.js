import { AddPlatformsToGrid, createTileGrid, connectTileGrid } from "./tilegrid.js";
import { pruneObstacles } from "./platform-pruner.js";
import { playerRect, placePlayer, setPlayerStartPosition } from "./player.js";
import { enemyRect, placeEnemy } from "./enemy.js";

//Create
export function initialize() {
    createTileGrid();
    AddPlatformsToGrid();
    pruneObstacles(0);
    connectTileGrid();
    setPlayerStartPosition();
}

export function gameStateHandler() {
    gameOverCheck();
    checkHealth();
}

function gameOverCheck() {
    if (playerRect.health < 0) {
        placePlayer();
        placeEnemy();
        playerRect.kills = 0;
        playerRect.health = playerRect.maxHealth;
        enemyRect.health = enemyRect.maxHealth;
        enemyRect.speed = enemyRect.initialSpeed;
        playerRect.attack = playerRect.initialAttack;
    }
}
function checkHealth() {
    if (enemyRect.health <= 0) {
        if (playerRect.maxHealth - playerRect.health >= playerRect.healthBoost) {
            playerRect.health += playerRect.healthBoost;
        } else {
            playerRect.health += playerRect.maxHealth - playerRect.health;
        }

        playerRect.previousKills = playerRect.kills;
        playerRect.kills += 1;
        if (!(playerRect.kills%5 && playerRect.kills > 0)) {
            console.log("increasing max hp")
            playerRect.maxHealth += 10;  
            if (playerRect.attack < 15) {
                playerRect.attack += 0.5
            }         
        }
        if (enemyRect.speed < 300) {
            enemyRect.speed += 10;
        }
        placeEnemy();
        enemyRect.health = enemyRect.maxHealth;
    }
}


