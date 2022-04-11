import { canvas } from "./Elements.js";
export class Drawer {

    constructor() {
    }

    draw(entities) {
        const ctx = canvas.getContext('2d');
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.drawEntities(ctx, entities);
        
    }

    drawEntities(ctx, entities) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.draw(ctx);
        }
    }
}