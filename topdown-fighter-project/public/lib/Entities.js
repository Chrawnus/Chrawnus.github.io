import { Enemy } from "./Enemy.js";
import { getEntityPosOnTileGrid } from "./helperFunctions.js";
import { Player } from "./player.js";
import { TileGrid } from "./tilegrid.js";



export class Entities {
    constructor() {
        this.player = new Player();
        this.enemy = new Enemy();
        this.room = new TileGrid();
    }

    getPlayerPosition(tileGrid) {
        getEntityPosOnTileGrid(this.player, tileGrid);
    }

    getEnemyPosition(tileGrid) {
        getEntityPosOnTileGrid(this.enemy, tileGrid);
    }


}