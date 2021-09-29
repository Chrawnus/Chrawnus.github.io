import { moveCollideX, moveCollideY } from "./physics.js";

export class Entity {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.startPos = {
            x: x,
            y: y,
        }
    }

    resetVelocity() {
        this.vx = 0;
        this.vy = 0;
    }

    collision(worldHandler, entity) {
        moveCollideX(this.vx, this, worldHandler.worldComponents[1], this.onCollideX);
        moveCollideY(this.vy, this, worldHandler.worldComponents[1], this.onCollideY);

        moveCollideY(this.vy, this, entity, this.onCollideY);
        moveCollideX(this.vx, this, entity, this.onCollideX);
    }

    onCollideX(rect, otherRect) {
        rect.vx = 0;
        return true;
    }
    
    onCollideY(rect, otherRect) {
        rect.vy = 0;
        return true;
    }
}