import { Point2d } from "./Point2d.js";
import { Update } from "./Update.js";
import { Draw } from "./Draw.js";
import { canvas } from "./Elements.js";
import { Geometry } from "./Geometry.js";
import { Helper } from "./helperFunctions.js";
export class Projectile extends Geometry{
    constructor(x, y, angle){
        super()
        this.pos = new Point2d(x, y);
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
        Helper.Movement.wrap(this, canvas)
        Update.Physics.Movement.move(dt, this, this.speed, this.speedScaling, this.angle); 
    }
}