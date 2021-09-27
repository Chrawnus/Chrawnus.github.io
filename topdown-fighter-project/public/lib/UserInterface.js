import { killStats, deathStat, statPoints, incHealthButton, incHealingButton, incSpeedButton, incAttackButton, incAttackSpeedButton, resumeButton, saveButton, loadButton } from "./elements.js";


export class UserInterface {
    constructor() {
        this.killStats = killStats;
        this.deathStat = deathStat;
        this.statPoints = statPoints;
        this.incHealthButton = incHealthButton;
        this.incHealingButton = incHealingButton;
        this.incSpeedButton = incSpeedButton;
        this.incAttackButton = incAttackButton;
        this.incAttackSpeedButton = incAttackSpeedButton;
        this.resumeButton = resumeButton;
        this.saveButton = saveButton;
        this.loadButton = loadButton;
        this.running = false;
    }

    initializeMenuButtons(player, enemy) {
        this.incHealthButton.addEventListener('click', e => this.checkStatButton(e, player));
        this.incHealingButton.addEventListener('click', e => this.checkStatButton(e, player));
        this.incSpeedButton.addEventListener('click', e => this.checkStatButton(e, player));
        this.incAttackButton.addEventListener('click', e => this.checkStatButton(e, player));
        this.incAttackSpeedButton.addEventListener('click', e => this.checkStatButton(e, player));
        this.resumeButton.addEventListener('click', () => {
            if (this.running) {
                this.pauseGame(player);
            } else {
                this.startGame(player);
            }
    
        });
        this.saveButton.addEventListener('click', (e) => {
            if (this.running) {
                return;
            }
            this.saveGame(player, enemy),
                e.preventDefault();
    
        });
        this.loadButton.addEventListener('click', (e) => {
            if (this.running) {
                return;
            }
            this.loadGame(player, enemy),
                e.preventDefault();
        });
    
        this.incHealthButton.textContent = `health: +${player.statBoosts.health}`;
        this.incHealingButton.textContent = `healing power: ${player.statBoosts.healing}`;
        this.incSpeedButton.textContent = `speed: +${player.statBoosts.speed}`;
        this.incAttackButton.textContent = `attack: +${player.statBoosts.attack}`;
        this.incAttackSpeedButton.textContent = `attack speed: -${player.statBoosts.attackSpeed}%`;
    }

    checkStatButton(e, player) {
        if (this.running) {
            return;
        } else {
            this.increaseStat(e, player);
        }
    

    }

    increaseStat(e, player) {
        if (player.statistics.statPoints > 0) {
            switch (e.target.id) {
                case 'health':
                    console.log('health');
                    player.maxHealth += player.statBoosts.health;
                    player.health = player.maxHealth;

                    player.statistics.statPoints -= 1;
                    player.statistics.expendedStatPoints.health += 1;

                    break;
                case 'healing-power':
                    console.log('healing power');
                    player.statBoosts.healing += 10;
                    player.statistics.statPoints -= 1;
                    player.statistics.expendedStatPoints.healing += 1;

                    break;
                case 'speed':
                    console.log('speed');
                    player.speed += player.statBoosts.speed;
                    player.statistics.statPoints -= 1;
                    player.statistics.expendedStatPoints.speed += 1;

                    break;
                case 'attack':
                    console.log('attack');
                    player.attack += player.statBoosts.attack;
                    player.statistics.statPoints -= 1;
                    player.statistics.expendedStatPoints.attack += 1;

                    break;
                case 'attack-speed':
                    console.log('attack speed');

                    if (player.startingAttackDelay > 50) {
                        player.startingAttackDelay -= player.statBoosts.attackSpeed;
                        player.attackDelay = player.startingAttackDelay;
                    }

                    player.statistics.statPoints -= 1;
                    player.statistics.expendedStatPoints.attackSpeed += 1;
                    break;
                default:
                    break;
            }
            this.refreshUI(player);
        }
    }

    refreshUI(player) {
        this.statPoints.textContent = `stat points: ${player.statistics.statPoints}`;
        this.killStats.textContent = `kills: ${player.statistics.kills}`;
        this.deathStat.textContent = `deaths: ${player.statistics.deaths}`;
        this.incHealingButton.textContent = `healing power: ${player.statBoosts.healing}`;
    }

    pauseGame(player) {
        if (this.running) {
            player.attackBox.lifetime = 0;
            this.running = false;
            this.resumeButton.textContent = 'resume game'
        }
    }
    
    startGame(player) {
        if (player.statistics.statPoints <= 0 && !this.running) {
            this.running = true;
            this.resumeButton.textContent = 'pause game'
    
        }
    }

    onGameOver(player) {
        this.refreshUI(player);
        this.pauseGame(player);
    }
    
    saveGame(player, enemy) {
        console.log(player, enemy)
        const playerSave = {
            x: player.x,
            y: player.y,
            width: player.width,
            height: player.height,
            maxHealth: player.maxHealth,
            health: player.health,
            initialAttack: player.initialAttack,
            attack: player.attack,
            currentInhabitedTile: player.currentInhabitedTile,
            color: player.color,
            speed: player.speed,
            storedAttacks: player.storedAttacks,
            startingAttackDelay: player.startingAttackDelay,
            attackDelay: player.attackDelay,
            vx: player.vx,
            vy: player.vy,
            inputBuffer: player.inputBuffer,
            attackBox: player.attackBox,
            statistics: player.statistics,
            statBoosts: player.statBoosts,
        }        
        const enemySave = {
            x: enemy.x,
            y: enemy.y,
            width: enemy.width,
            height: enemy.height,
            maxHealth: enemy.maxHealth,
            health: enemy.health,
            attack: enemy.attack,
            currentInhabitedTile: enemy.currentInhabitedTile,
            color: enemy.color,
            initialSpeed: enemy.initialSpeed,
            speed: enemy.speed,
            maxSpeed: enemy.maxSpeed,
            knockback: enemy.knockback,
            startingAttackDelay: enemy.startingAttackDelay,
            attackDelay: enemy.attackDelay,
            vx: enemy.vx,
            vy: enemy.vy,
            statBoosts: enemy.statBoosts,
        }
    
        const saveObject = { playerSave, enemySave };
    
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
    
    loadGame(player, enemy) {

        fetch('/load', {
            method: 'GET'
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                const save = JSON.parse(data[0].save);
                this.loadEntity(player, save.playerSave);
                this.loadEntity(enemy, save.enemySave);
                this.incHealthButton.textContent = `health: +${player.statBoosts.health}`;
                this.incHealingButton.textContent = `healing power: ${player.statBoosts.healing}`;
                this.incSpeedButton.textContent = `speed: +${player.statBoosts.speed}`;
                this.incAttackButton.textContent = `attack: +${player.statBoosts.attack}`;
                this.incAttackSpeedButton.textContent = `attack speed: -${player.statBoosts.attackSpeed}%`;
                this.killStats.textContent = `kills: ${player.statistics.kills}`;
                this.statPoints.textContent = `stat points: ${player.statistics.statPoints}`;
                this.deathStat.textContent = `deaths: ${player.statistics.deaths}`;
            });
    
    }
    
    
    loadEntity(entity, entitySave) {
        console.log(entity);
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
        if (entity.statistics !== undefined) {
            entity.statistics = entitySave.statistics;
        }
        if (entity.statBoosts !== undefined) {
            entity.statBoosts = entitySave.statBoosts;
        }
    }
}