import { Shape } from "./Shape.js";

export class Projectile extends Shape {
    constructor(x, y, angle) {
        super(x, y)
        this.radius = 4;
        this.hitboxRadius = this.radius;
        this.speed = 2000;
        this.speedScaling = 1;
        this.angle = angle;
        this.lifetime = 0.4;
    }

    update(canvas, dt, projectiles) {
        this.updateLifetime(dt);
        if (this.isOutOfLifetime()) {
            this.killEntity(projectiles);
        }
        this.move(dt);
        this.wrap(canvas);
    }

    updateLifetime(dt) {
        this.lifetime -= dt;
    }
    isOutOfLifetime() {
        return (this.lifetime !== undefined && this.lifetime <= 0)
    }

}