import { playerRect, placePlayer } from "./player.js";
import { enemyRect, placeEnemy } from "./enemy.js";

export function checkHealth() {
    if (playerRect.health < 0) {
        placePlayer();
        placeEnemy();
        playerRect.kills = 0;
        playerRect.health = playerRect.maxHealth;
        enemyRect.health = enemyRect.maxHealth;
        enemyRect.speed = enemyRect.initialSpeed;
        playerRect.attack = playerRect.initialAttack;
    }

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

