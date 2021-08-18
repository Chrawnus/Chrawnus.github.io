import { AddPlatformsToGrid, createTileGrid, connectTileGrid, tileGrid, tileGridSize } from "./tilegrid.js";
import { pruneObstacles } from "./platform-pruner.js";
import { playerRect } from "./player.js";
import { enemyRect } from "./enemy.js";
import { killStats, deathStat } from "./elements.js";

export let running = true;

const playerStartPos = {
    x: 0,
    y: 0
};

const enemyStartPos = {
    x: 640,
    y: 640
};

initialize();

//Create
export function initialize() {
    createTileGrid();
    AddPlatformsToGrid();
    pruneObstacles(0);
    setPlayerStartPosition();
    connectTileGrid();
    placePlayer();
    placeEnemy();
};

export function gameStateHandler() {
    checkEnemyState();
    gameOverCheck();
};

function gameOverCheck() {
    if (playerRect.health < 0) {
        updateDeaths();
        resetPlayerPos();
        resetEnemyPos();
        pauseGame();
    }
};

function checkEnemyState() {
    if (enemyRect.health <= 0) {
        boostPlayerHealth();
        updatePlayerKills();
        boostEnemyStats();
        resetEnemyPos();
    }
};

function boostEnemyStats() {
    if (enemyRect.speed < 300) {
        enemyRect.speed += 10;
    }
};

function updatePlayerKills() {
    playerRect.previousKills = playerRect.kills;
    playerRect.kills += 1;
    updateKills();
};

function setPlayerStartPosition() {
    const x = tileGrid[Math.floor(Math.sqrt(tileGridSize) / 2)].x
    const y = tileGrid[Math.floor(tileGridSize / 2)].y
    playerStartPos.x = x;
    playerStartPos.y = y;
};

function placePlayer() {
    playerRect.x = playerStartPos.x;
    playerRect.y = playerStartPos.y;
};

function placeEnemy() {
    enemyRect.x = enemyStartPos.x;
    enemyRect.y = enemyStartPos.y;
};

function boostPlayerHealth() {
    if (playerRect.maxHealth - playerRect.health >= playerRect.healthBoost) {
        playerRect.health += playerRect.healthBoost;
    } else {
        playerRect.health += playerRect.maxHealth - playerRect.health;
    }
};

function resetPlayerPos() {
    placePlayer();
    playerRect.health = playerRect.maxHealth;
    playerRect.attack = playerRect.initialAttack;
};

function resetEnemyPos() {
    placeEnemy();
    enemyRect.health = enemyRect.maxHealth;
};

function updateKills() {
    killStats.textContent = `kills: ${playerRect.kills}`;
};

function updateDeaths() {
    playerRect.deaths += 1;
    increaseDeathCounter()
};

function increaseDeathCounter() {
    deathStat.textContent = `deaths: ${playerRect.deaths}`;
};

function pauseGame() {
    if (running) {
        running = false;
    }
}
