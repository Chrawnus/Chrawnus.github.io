import { Entities } from "./Entities.js";
import { getEntityPosOnTileGrid } from "./helperFunctions.js";

const entities = new Entities();

entities.room.createTileGrid();

export class Initialize {
    constructor() {

        this.tileGrid = entities.room.tileGrid;
        this.walls = entities.room.walls;
        this.player = entities.player;
        this.enemy = entities.enemy;

        this.playerStartPos = {
            x: 0,
            y: 0
        };

        this.enemyStartPos = {
            x: 640,
            y: 640
        };
    }

    initialize() {
        this.setPlayerStartPosition();
        this.setEnemyStartPosition();

        this.placePlayer();
        this.placeEnemy();
    }

    placePlayer() {
        this.player.x = this.playerStartPos.x;
        this.player.y = this.playerStartPos.y;
    };

    placeEnemy() {
        this.enemy.x = this.enemyStartPos.x;
        this.enemy.y = this.enemyStartPos.y;
    };

    setPlayerStartPosition() {
        const { x, y } = this.determinePosition(4, 2);
        this.setPosition(x, y, this.playerStartPos);
    };

    setEnemyStartPosition() {
        const { x, y } = this.determinePosition(1.35, 2);
        this.setPosition(x, y, this.enemyStartPos);
    };

    resetPlayerPos() {
        this.placePlayer();
        this.player.health = this.player.maxHealth;
        this.player.attack = this.player.initialAttack;
    };

    resetEnemyPos() {
        this.placeEnemy();
        this.enemy.health = this.enemy.maxHealth;
    };

    setPosition(x, y, entityStartPos) {
        entityStartPos.x = x;
        entityStartPos.y = y;
    }

    determinePosition(hor, ver) {

        const x = this.tileGrid[Math.floor(Math.sqrt(entities.room.tileGridSize) / hor)].x;
        const y = this.tileGrid[Math.floor(entities.room.tileGridSize / ver)].y;
        return { x, y };
    }
    onGameOver() {
        this.player.updateDeaths();
        this.resetPlayerPos();
        this.resetEnemyPos();
    }

    gameOverCheck() {
        return this.player.health < 0;
    }
    
    checkEnemyState() {
        return this.enemy.health <= 0
    };

    getEnemyPosition() {
        getEntityPosOnTileGrid(this.enemy, this.tileGrid);
    }

    getPlayerPosition() {
        getEntityPosOnTileGrid(this.player, this.tileGrid);
    }

}
