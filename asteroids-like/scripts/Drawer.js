import { canvas } from "./Elements.js";

export class Drawer {

    constructor() {

        this.entities = [];
    }

    draw() {

        
        const ctx = canvas.getContext('2d');
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.drawEntities(ctx);
        
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    drawEntities(ctx) {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.draw(ctx);
        }
    }
}