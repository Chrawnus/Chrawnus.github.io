import { Draw } from "./Draw.js";
import { Geometry } from "./Geometry.js";
import { Update } from "./Update.js";

export class Projectile extends Geometry{
    constructor(pos, angle){
        super()
        this.pos = pos;
        this.radius = 4;
        this.hitboxRadius = this.radius;
        this.speed = 2400;
        this.speedScaling = 1;
        this.angle = angle;
        this.lifetime = 0.3;
    }

    draw(ctx) {
        Draw.Geometry.drawCircle(ctx, "white", 1, this.pos, this.radius);
    }

    update(dt) {
        Update.EntityMethods.updateLifetime(dt, this);
        Update.Physics.Movement.wrap(this)
        Update.Physics.Movement.move(dt, this, this.speed, this.speedScaling, this.angle);
    }
}