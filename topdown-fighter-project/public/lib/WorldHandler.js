import { World } from "./World.js";

export class WorldHandler {
    constructor() {
        this.world = new World();
        this.worldComponents = {};
        this.world.createTileGrid();
        this.addWorldComponents(this.world.tileGrid, this.world.walls);

        this.walls = this.world.walls; 
    }

    addComponent(component, id) {
        this.worldComponents[id] = component;
    }

    addWorldComponents(...components) {
        
        for (let i = 0; i < components.length; i++) {
            const component = components[i];
            
            this.addComponent(component, i);
        }
    }

    getEntityPosOnTileGrid(entity) {
        for (let i = 0; i < this.floor.length; i++) {
            const tile = this.floor[i];
            
            if ((entity.x + entity.width / 2 > tile.x &&
                entity.x + entity.width / 2 < tile.x + tile.width &&
                entity.y + entity.height / 2 > tile.y &&
                entity.y + entity.height / 2 < tile.y + tile.height)) {
                entity.currentInhabitedTile = i;
            }
        }
    }
}