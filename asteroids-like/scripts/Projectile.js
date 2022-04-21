import { Geometry } from "./Geometry.js";

export class Projectile extends Geometry{
    constructor(x, y, angle){
        super(x, y)
        this.radius = 4;
        this.hitboxRadius = this.radius;
        this.speed = 2400;
        this.speedScaling = 1;
        this.angle = angle;
        this.lifetime = 0.3;
    }

    draw(ctx) {
        
    }

    update(dt) {

    }
}