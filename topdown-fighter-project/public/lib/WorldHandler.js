import { World } from "./World.js";

export class WorldHandler {
    constructor() {
        this.world = new World();
        this.worldComponents = {};
        this.walls = this.world.walls; 
    }

    initialize() {
        this.world.createTileGrid();
        this.addWorldComponents(this.world.tileGrid, this.world.walls);
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
}