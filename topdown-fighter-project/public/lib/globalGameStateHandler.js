import { TileGrid } from "./tilegrid.js";
import { player, updatePlayer } from "./player.js";
import { enemyRect, updateEnemy } from "./enemy.js";
import { killStats, deathStat, statPoints, incHealthButton, incHealingButton, incSpeedButton, incAttackButton, incAttackSpeedButton, resumeButton, saveButton, loadButton } from "./elements.js";
import { Drawer } from "./draw.js"
import { Initialize } from "./Initialize.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { getEntityPosOnTileGrid } from "./helperFunctions.js";
import { Pathfinding } from "./pathFinding.js";

let running = false;
let elapsed;
const drawer = new Drawer();
const pathfinder = new Pathfinding(enemyRect.pathToPlayer);

export const tileGrid = new TileGrid();
export const initializer = new Initialize();

const playerStatistics = {
    kills: 0,
    deaths: 0,
    statPoints: 0,
    expendedStatPoints: {
        health: 0,
        healing: 0,
        speed: 0,
        attack: 0,
        attackSpeed: 0
    }
}

const playerStatBoosts = {
    health: 20,
    healing: 10,
    speed: 10,
    attack: 10,
    attackSpeed: 45,
}

const enemyStatBoosts = {
    health: 10,
    speed: 10,
    attack: 5,
    attackSpeed: 1,
}

initializeMenuButtons();
initialize();

function initializeMenuButtons() {
    incHealthButton.addEventListener('click', e => checkStatButton(e));
    incHealingButton.addEventListener('click', e => checkStatButton(e));
    incSpeedButton.addEventListener('click', e => checkStatButton(e));
    incAttackButton.addEventListener('click', e => checkStatButton(e));
    incAttackSpeedButton.addEventListener('click', e => checkStatButton(e));
    resumeButton.addEventListener('click', () => {
        if (running && playerStatistics.statPoints >= 5) {
            pauseGame();
        } else {
            startGame();
        }

    });
    saveButton.addEventListener('click', (e) => {
        if (running) {
            return;
        }
        saveGame(),
            e.preventDefault();

    });
    loadButton.addEventListener('click', (e) => {
        if (running) {
            return;
        }
        loadGame(),
            e.preventDefault();
    });

    incHealthButton.textContent = `health: +${playerStatBoosts.health}`;
    incHealingButton.textContent = `healing power: ${playerStatBoosts.healing}`;
    incSpeedButton.textContent = `speed: +${playerStatBoosts.speed}`;
    incAttackButton.textContent = `attack: +${playerStatBoosts.attack}`;
    incAttackSpeedButton.textContent = `attack speed: -${playerStatBoosts.attackSpeed}%`;
}

//Create

export function initialize() {
    initializer.setPlayerStartPosition();
    initializer.setEnemyStartPosition();

    initializer.placePlayer();
    initializer.placeEnemy();
};

export function gameStateHandler(dt, now) {
    if (!running) {
        return
    }
    checkEnemyState();
    gameOverCheck();
    update(dt, now);
    drawer.draw(initializer.tileGrid, initializer.walls);
};

function gameOverCheck() {
    if (player.health < 0) {
        updateDeaths();
        initializer.resetPlayerPos();
        initializer.resetEnemyPos();
        pauseGame();
    }
};

function checkEnemyState() {
    if (enemyRect.health <= 0) {
        healPlayer();
        updatePlayerKills();
        boostEnemyStats();
        initializer.resetEnemyPos();
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
                    player.maxHealth += playerStatBoosts.health;
                    player.health = player.maxHealth;

                    playerStatistics.statPoints -= 1;
                    playerStatistics.expendedStatPoints.health += 1;

                    break;
                case 'healing-power':
                    console.log('healing power');
                    playerStatBoosts.healing += 10;
                    incHealingButton.textContent = `healing power: ${playerStatBoosts.healing}`

                    playerStatistics.statPoints -= 1;
                    playerStatistics.expendedStatPoints.healing += 1;

                    break;
                case 'speed':
                    console.log('speed');
                    player.speed += playerStatBoosts.speed;

                    playerStatistics.statPoints -= 1;
                    playerStatistics.expendedStatPoints.speed += 1;

                    break;
                case 'attack':
                    console.log('attack');
                    player.attack += playerStatBoosts.attack;

                    playerStatistics.statPoints -= 1;
                    playerStatistics.expendedStatPoints.attack += 1;

                    break;
                case 'attack-speed':
                    console.log('attack speed');

                    if (player.startingAttackDelay > 50) {
                        player.startingAttackDelay -= playerStatBoosts.attackSpeed;
                        player.attackDelay = player.startingAttackDelay;
                    }

                    playerStatistics.statPoints -= 1;
                    playerStatistics.expendedStatPoints.attackSpeed += 1;
                    console.log(player.attackDelay)
                    break;
                default:
                    break;
            }
            statPoints.textContent = `stat points: ${playerStatistics.statPoints}`;
        }
    }
}

function boostEnemyStats() {
    enemyRect.maxHealth += enemyStatBoosts.health;
    enemyRect.speed < enemyRect.maxSpeed ? enemyRect.speed += enemyStatBoosts.speed :
        enemyRect.speed > enemyRect.maxSpeed ? enemyRect.speed = enemyRect.maxSpeed : 0;
    enemyRect.attack += enemyStatBoosts.attack;
};

function updatePlayerKills() {
    updateKills();
    increaseStatPoints();
};





function healPlayer() {
    if (player.maxHealth - player.health >= playerStatBoosts.healing) {
        player.health += playerStatBoosts.healing;
    } else {
        player.health += player.maxHealth - player.health;
    }
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
        player.attackBox.lifetime = 0;
        running = false;
        resumeButton.textContent = 'resume game'
    }
}

function startGame() {
    if (playerStatistics.statPoints <= 0 && !running) {
        running = true;
        resumeButton.textContent = 'pause game'

    }
}

function saveGame() {
    const playerStats = playerStatistics;
    const playerSB = playerStatBoosts;
    const player = player;
    const enemy = enemyRect;
    const saveObject = { playerStats, playerSB, player, enemy }

    console.log(saveObject.enemy)

    fetch('/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(saveObject),
    })
        .then(response => response.json())
        .then(saveObject => {
            console.log('Success:', saveObject);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function loadGame() {
    fetch('/load', {
        method: 'GET'
    })
        .then(function (res) {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(function (data) {
            const save = JSON.parse(data[0].save);
            loadEntity(player, save.player);
            loadEntity(enemyRect, save.enemy);
            loadStatistics(playerStatistics, save.playerStats);
            loadSB(playerStatBoosts, save.playerSB);
            console.log(enemyRect);
            incHealthButton.textContent = `health: +${playerStatBoosts.health}`;
            incHealingButton.textContent = `healing power: ${playerStatBoosts.healing}`;
            incSpeedButton.textContent = `speed: +${playerStatBoosts.speed}`;
            incAttackButton.textContent = `attack: +${playerStatBoosts.attack}`;
            incAttackSpeedButton.textContent = `attack speed: -${playerStatBoosts.attackSpeed}%`;
            killStats.textContent = `kills: ${playerStatistics.kills}`;
            statPoints.textContent = `stat points: ${playerStatistics.statPoints}`;
            deathStat.textContent = `deaths: ${playerStatistics.deaths}`;
        });

}


function loadEntity(entity, entitySave) {
    entity.x = entitySave.x;
    entity.y = entitySave.y;
    entity.maxHealth = entitySave.maxHealth;
    entity.health = entitySave.health;
    entity.initialAttack = entitySave.initialAttack;
    entity.attack = entitySave.attack;
    entity.currentInhabitedTile = entitySave.currentInhabitedTile;
    entity.speed = entitySave.speed;
    entity.startingAttackDelay = entitySave.startingAttackDelay;
    entity.attackDelay = entitySave.attackDelay;
    entity.vx = entitySave.vx;
    entity.vy = entitySave.vy;
}

function loadStatistics(statistics, saveStatistics) {
    statistics.kills = saveStatistics.kills;
    statistics.deaths = saveStatistics.deaths;
    statistics.statPoints = saveStatistics.statPoints;
    statistics.expendedStatPoints = saveStatistics.expendedStatPoints;
}

function loadSB(statboosts, saveStatBoosts) {
    statboosts.health = saveStatBoosts.health;
    statboosts.healing = saveStatBoosts.healing;
    statboosts.speed = saveStatBoosts.speed;
    statboosts.attack = saveStatBoosts.attack;
    statboosts.attackSpeed = saveStatBoosts.attackSpeed;
}

function update(dt, now) {
    getEntityPosOnTileGrid(player, initializer.tileGrid);
    getEntityPosOnTileGrid(enemyRect, initializer.tileGrid);

    
    updatePlayer(dt);
    moveCollideX(player.vx, player, initializer.walls, onCollideX);
    moveCollideY(player.vy, player, initializer.walls, onCollideY(player));

    moveCollideX(player.vx, player, enemyRect, onCollideX);
    moveCollideY(player.vy, player, enemyRect, onCollideY);

    
    increaseElapsed(dt);
    refreshPathfinding();
    resetElapsed();

    updateEnemy(dt, now);
    moveCollideX(enemyRect.vx, enemyRect, initializer.walls, onCollideX);
    moveCollideY(enemyRect.vy, enemyRect, initializer.walls, onCollideY);

    moveCollideY(enemyRect.vy, enemyRect, player, onCollideY);
    moveCollideX(enemyRect.vx, enemyRect, player, onCollideX);
}

function onCollideX(rect, otherRect) {
    rect.vx = 0;
    return true;
}

function onCollideY(rect, otherRect) {
    rect.vy = 0;
    return true;
}

function refreshPathfinding() {
    if (enemyRect.pathToPlayer === undefined || enemyRect.pathToPlayer.length === 0 || elapsed > 0.2) {
        enemyRect.pathToPlayer = pathfinder.update(initializer.tileGrid[enemyRect.currentInhabitedTile], initializer.tileGrid[player.currentInhabitedTile]);
        //elapsed = 0;
    }
}

function resetElapsed() {
    if (elapsed > 0.3) {
        elapsed = 0;
    }
}

function increaseElapsed(dt) {
    if (elapsed === undefined) {
        elapsed = dt;
    } else {
        elapsed += dt;
    }
}
