import { AddPlatformsToGrid, createTileGrid, connectTileGrid, tileGrid, tileGridSize } from "./tilegrid.js";
import { pruneObstacles } from "./platform-pruner.js";
import { playerRect } from "./player.js";
import { enemyRect } from "./enemy.js";
import { killStats, deathStat, statPoints, incHealthButton, incHealingButton, incSpeedButton, incAttackButton, incAttackSpeedButton } from "./elements.js";
import { attackBox } from "./playerAttackBox.js";

export let running = true;

const playerStartPos = {
    x: 0,
    y: 0
};

const enemyStartPos = {
    x: 640,
    y: 640
};

const playerStatistics = {
    kills: 0,
    deaths: 0,
    statPoints: 0,
    expendedStatPoints: 0
}

const playerStatBoosts = {
    health: 20,
    healing: 10,
    speed: 10,
    attack: 10,
    attackSpeed: 15,
}

const enemyStatBoosts = {
    health: 10,
    speed: 10,
    attack: 5,
    attackSpeed: 1,
}

initializeStatButtons();
initialize();

function initializeStatButtons() {
    incHealthButton.addEventListener('click', e => checkStatButton(e));
    incHealingButton.addEventListener('click', e => checkStatButton(e));
    incSpeedButton.addEventListener('click', e => checkStatButton(e));
    incAttackButton.addEventListener('click', e => checkStatButton(e));
    incAttackSpeedButton.addEventListener('click', e => checkStatButton(e));

    incHealthButton.textContent = `health: +${playerStatBoosts.health}`;
    incHealingButton.textContent = `healing power: ${playerStatBoosts.healing}`;
    incSpeedButton.textContent = `speed: +${playerStatBoosts.speed}`;
    incAttackButton.textContent = `attack: +${playerStatBoosts.attack}`;
    incAttackSpeedButton.textContent = `attack speed: -${playerStatBoosts.attackSpeed}%`;
}

//Create
export function initialize() {
    createTileGrid();
    AddPlatformsToGrid();
    pruneObstacles(0);
    setPlayerStartPosition();
    setEnemyStartPosition();
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
        healPlayer();
        updatePlayerKills();
        boostEnemyStats();
        resetEnemyPos();
    }
};

function checkStatButton(e) {
    if (running) {
        return;
    } else {
        increaseStat();
    }

    function increaseStat() {
        if (playerStatistics.statPoints > 0) {
            switch (e.target.id) {
                case 'health':
                    console.log('health');
                    playerRect.maxHealth += playerStatBoosts.health;
                    playerRect.health = playerRect.maxHealth;

                    break;
                case 'healing-power':
                    console.log('healing power');
                    playerStatBoosts.healing += 10;
                    incHealingButton.textContent = `healing power: ${playerStatBoosts.healing}`

                    break;
                case 'speed':
                    console.log('speed');
                    playerRect.speed += playerStatBoosts.speed;

                    break;
                case 'attack':
                    console.log('attack');
                    playerRect.attack += playerStatBoosts.attack;

                    break;
                case 'attack-speed':
                    console.log('attack speed');
                    
                    playerStatistics.expendedStatPoints < 4 ? 
                    
                    playerRect.startingAttackDelay -= playerRect.startingAttackDelay * playerStatBoosts.attackSpeed/100 :
                    
                    playerRect.startingAttackDelay -= playerRect.startingAttackDelay * playerStatBoosts.attackSpeed/(Math.log(playerStatistics.expendedStatPoints))/100;

                    playerRect.attackDelay = playerRect.startingAttackDelay;

                    console.log(playerRect.attackDelay)
                    break;
                default:
                    break;
            }
            decreaseStatPoints();
            startGame();
        } else {
            startGame();
        }


        function startGame() {
            if (playerStatistics.statPoints <= 0) {
                running = true;
            }
        }
    }

    function decreaseStatPoints() {
        playerStatistics.statPoints -= 1;
        playerStatistics.expendedStatPoints += 1;
        statPoints.textContent = `stat points: ${playerStatistics.statPoints}`;
    }
}

function boostEnemyStats() {
    enemyRect.maxHealth += enemyStatBoosts.health;
    enemyRect.speed < enemyRect.maxSpeed ? enemyRect.speed += enemyStatBoosts.speed :
    enemyRect.speed > enemyRect.maxSpeed ? enemyRect.speed = enemyRect.maxSpeed : 0;
    enemyRect.attack += enemyStatBoosts.attack;
    console.log(enemyRect.maxHealth, enemyRect.speed, enemyRect.attack)
};

function updatePlayerKills() {
    updateKills();
    increaseStatPoints();
};

function setPlayerStartPosition() {
    const { x, y } = determinePosition(4, 2);
    setPosition(x, y, playerStartPos);
};

function setEnemyStartPosition() {
    const { x, y } = determinePosition(1.35, 2);
    setPosition(x, y, enemyStartPos);
};

function setPosition(x, y, entityStartPos) {
    entityStartPos.x = x;
    entityStartPos.y = y;
}

function determinePosition(hor, ver) {
    const x = tileGrid[Math.floor(Math.sqrt(tileGridSize) / hor)].x;
    const y = tileGrid[Math.floor(tileGridSize / ver)].y;
    return { x, y };
}

function placePlayer() {
    playerRect.x = playerStartPos.x;
    playerRect.y = playerStartPos.y;
};

function placeEnemy() {
    enemyRect.x = enemyStartPos.x;
    enemyRect.y = enemyStartPos.y;
};

function healPlayer() {
    if (playerRect.maxHealth - playerRect.health >= playerStatBoosts.healing) {
        playerRect.health += playerStatBoosts.healing;
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
    playerStatistics.kills += 1;
    killStats.textContent = `kills: ${playerStatistics.kills}`;
};

function increaseStatPoints() {
    playerStatistics.statPoints += 1;
    statPoints.textContent = `stat points: ${playerStatistics.statPoints}`;
}

function updateDeaths() {
    playerStatistics.deaths += 1;
    increaseDeathCounter()
};

function increaseDeathCounter() {
    deathStat.textContent = `deaths: ${playerStatistics.deaths}`;
};

function pauseGame() {
    if (running) {
        attackBox.lifetime = 0;
        running = false;
    }
}
