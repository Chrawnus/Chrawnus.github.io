import { TileGrid } from "./tilegrid.js";
import { player } from "./player.js";
import { enemyRect } from "./enemy.js";

const tileHandler = new TileGrid();
tileHandler.createTileGrid();

export class Initialize {
    constructor() {

        this.tileGrid = tileHandler.tileGrid;
        this.walls = tileHandler.walls;

        this.playerStartPos = {
            x: 0,
            y: 0
        };
        
        this.enemyStartPos = {
            x: 640,
            y: 640
        };
    }
    
    placePlayer() {
        player.x = this.playerStartPos.x;
        player.y = this.playerStartPos.y;
    };
    
    placeEnemy() {
        enemyRect.x = this.enemyStartPos.x;
        enemyRect.y = this.enemyStartPos.y;
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
        player.health = player.maxHealth;
        player.attack = player.initialAttack;
    };
    
    resetEnemyPos() {
        this.placeEnemy();
        enemyRect.health = enemyRect.maxHealth;
    };

    setPosition(x, y, entityStartPos) {
        entityStartPos.x = x;
        entityStartPos.y = y;
    }

    determinePosition(hor, ver) {

        const x = this.tileGrid[Math.floor(Math.sqrt(tileHandler.tileGridSize) / hor)].x;
        const y = this.tileGrid[Math.floor(tileHandler.tileGridSize / ver)].y;
        return { x, y };
    }
}
