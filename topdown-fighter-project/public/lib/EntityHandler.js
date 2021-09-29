import { World } from "./World.js";
import { Player } from "./Player.js";
import { Enemy } from "./Enemy.js";



export class EntityHandler {
    constructor() {
        this.entities = {};
        
        this.player = new Player("player");
        this.enemy = new Enemy("enemy");
        this.world = new World();
        
    }

    addEntity(entity) {
        this.entities[entity.id] = entity;
    }

    addEntities(...entities) {
        entities.forEach(entity => {
            this.addEntity(entity);
        });

    }

    getEntityPosOnTileGrid(entity, tileGrid) {
        for (let i = 0; i < tileGrid.length; i++) {
            const tile = tileGrid[i];
            
            if ((entity.x + entity.width / 2 > tile.x &&
                entity.x + entity.width / 2 < tile.x + tile.width &&
                entity.y + entity.height / 2 > tile.y &&
                entity.y + entity.height / 2 < tile.y + tile.height)) {
                entity.currentInhabitedTile = i;
            }
        }
    }
}