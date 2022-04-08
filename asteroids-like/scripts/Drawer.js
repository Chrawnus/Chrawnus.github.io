import { canvas } from "./Elements.js";
import { physics } from "./app.js"
export class Drawer {

    constructor() {
    }

    draw() {
        const ctx = canvas.getContext('2d');
    
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "black";
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.drawEntities(ctx);
        
    }

    drawEntities(ctx) {
        const entities = physics.entities;
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.draw(ctx);
        }
    }
}