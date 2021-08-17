import { AddPlatformsToGrid, createTileGrid, connectTileGrid, tileGrid, tileGridSize } from "./tilegrid.js";
import { pruneObstacles } from "./platform-pruner.js";
import { playerRect } from "./player.js";
import { enemyRect } from "./enemy.js";
import { killStats, deathStat } from "./elements.js";


const playerStartPos = {
    x: 0,
    y: 0
}

const enemyStartPos = {
    x: 640,
    y: 640
}

//Create
export function initialize() {
    createTileGrid();
    AddPlatformsToGrid();
    pruneObstacles(0);
    setPlayerStartPosition();
    connectTileGrid();
}

export function gameStateHandler() {
    playerRect.placed === 0 ? placePlayer() : 0;
    enemyRect.placed === 0 ? placeEnemy() : 0;
    
    gameOverCheck();
    checkHealth();
}

function gameOverCheck() {
    if (playerRect.health < 0) {
        placePlayer();
        placeEnemy();
        playerRect.health = playerRect.maxHealth;
        playerRect.attack = playerRect.initialAttack;
        enemyRect.health = enemyRect.maxHealth;
        enemyRect.speed = enemyRect.initialSpeed;
        playerRect.deaths += 1;
        updateDeaths();
        //window.cancelAnimationFrame();
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
        if (!(playerRect.kills % 5 && playerRect.kills > 0)) {
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
        updateKills();
    }
}

function placePlayer() {
    playerRect.x = playerStartPos.x;
    playerRect.y = playerStartPos.y;
    playerRect.placed = 1;
}

function placeEnemy() {
    enemyRect.x = enemyStartPos.x;
    enemyRect.y = enemyStartPos.y;
    enemyRect.placed = 1;
}

function setPlayerStartPosition() {
    const x = tileGrid[Math.floor(Math.sqrt(tileGridSize) / 2)].x
    const y = tileGrid[Math.floor(tileGridSize / 2)].y
    playerStartPos.x = x;
    playerStartPos.y = y;
}

function updateKills() {
    killStats.textContent = `kills: ${playerRect.kills}`;
}

function updateDeaths() {
    deathStat.textContent = `deaths: ${playerRect.deaths}`;
}