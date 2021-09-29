import { EntityHandler } from "./EntityHandler.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";
import { WorldHandler } from "./WorldHandler.js";

export class GameStateHandler {
    constructor() {
        this.entityHandler = new EntityHandler();
        this.worldHandler = new WorldHandler();
        this.entityHandler.addEntities(new Player('player', 0, 0, 32 * 0.8, 32 * 0.8, 'lime'), new Enemy('enemy', 640, 640, 32 * 0.8, 32 * 0.8, 'red'));
        this.entities = this.entityHandler.entities;
    }

    initialize() {

        this.setPlayerStartPosition();
        this.setEnemyStartPosition();

        this.placePlayer();
        this.placeEnemy();
    }

    placePlayer() {
        this.entities['player'].x = this.entities['player'].startPos.x;
        this.entities['player'].y = this.entities['player'].startPos.y;
    };

    placeEnemy() {
        this.entities['enemy'].x = this.entities['enemy'].startPos.x;
        this.entities['enemy'].y = this.entities['enemy'].startPos.y;
    };

    setPlayerStartPosition() {
        const { x, y } = this.determinePosition(4, 2);
        this.setPosition(x, y, this.entities['player'].startPos);
    };

    setEnemyStartPosition() {
        const { x, y } = this.determinePosition(1.35, 2);
        this.setPosition(x, y, this.entities['enemy'].startPos);
    };

    resetPlayerPos() {
        this.placePlayer();
        this.entities['player'].health = this.entities['player'].maxHealth;
        this.entities['player'].attack = this.entities['player'].initialAttack;
    };

    resetEnemyPos() {
        this.placeEnemy();
        this.entities['enemy'].health = this.entities['enemy'].maxHealth;
    };

    setPosition(x, y, entityStartPos) {
        entityStartPos.x = x;
        entityStartPos.y = y;
    }

    determinePosition(hor, ver) {
        const x = this.worldHandler.worldComponents[0][Math.floor(Math.sqrt(this.worldHandler.world.tileGridSize) / hor)].x;
        const y = this.worldHandler.worldComponents[0][Math.floor(this.worldHandler.world.tileGridSize / ver)].y;
        return { x, y };
    }
    onGameOver() {
        this.entities['player'].updateDeaths();
        this.resetPlayerPos();
        this.resetEnemyPos();
    }

    gameOverCheck() {
        return this.entities['player'].health < 0;
    }
    
    checkEnemyState() {
        return this.entities['enemy'].health <= 0
    };

    getEnemyPosition() {
        this.entityHandler.getEntityPosOnTileGrid(this.entities['enemy'], this.worldHandler.worldComponents[0]);
    }

    getPlayerPosition() {
        this.entityHandler.getEntityPosOnTileGrid(this.entities['player'], this.worldHandler.worldComponents[0]);
    }

}
