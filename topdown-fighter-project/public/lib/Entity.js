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
        this.knockedBack = false;
        this.hasAttacked = false;
        this.elapsed = 0;
        this.attackCooldown = 0;
        this.drag = 200;
    }

    friction(dt) {
        this.vx *= 1 - dt * this.drag;
        this.vy *= 1 - dt * this.drag;
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

    onAttacked(entity, dt) {
        if (this.knockedBack == true)
            return;

        if (this.health > 0) {
            this.health -= entity.attack;
            this.knockBackFunction(entity.attackBox.direction, entity.knockback, dt)
            this.knockedBack = true;
        }
    }

    knockBackFunction(attackDirection, knockback, dt) {
        if (attackDirection === "up" || attackDirection === "down") {
            this.vy -= attackDirection === 'Up' ? knockback * dt : 0;
            this.vy += attackDirection === 'Down' ? knockback * dt : 0;
        } else if (attackDirection === "left" || attackDirection === "right") {
            this.vx -= attackDirection === 'Left' ? knockback * dt : 0;
            this.vx += attackDirection === 'Right' ? knockback * dt : 0;
        }

        // this.vy -= attackDirection === 'Up' ? knockback * dt : 0;
        // this.vy += attackDirection === 'Down' ? knockback * dt : 0;
        // this.vx -= attackDirection === 'Left' ? knockback * dt : 0;
        // this.vx += attackDirection === 'Right' ? knockback * dt : 0;

        return;
    }

    recover() {
        if (this.elapsed > 0.5) {
            this.knockedBack = false;
            this.elapsed = 0;
        }

    }
}