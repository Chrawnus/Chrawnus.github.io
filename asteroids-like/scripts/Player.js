import { Point2d } from "./Point2d.js";
import { Helper } from "./helperFunctions.js";
import { Projectile } from "./Projectile.js";
import { engine } from "./app.js";
import { canvas } from "./Elements.js";
import { Geometry } from "./Geometry.js";

export class Player extends Geometry{
    constructor(pos, sideNumber, radius) {
        super(pos, sideNumber, radius)
        this.radius = radius;
        this.hitboxRadius = radius*0.50;
        this.speed = 250;
        this.hasShot = false;
        this.cooldown = 0.4;
        this.cooldownOrig = 0.4;
        this.points = this.getVertexPoints();
    }



    draw(ctx) {
        let x = this.pos.x;
        let y = this.pos.y;
        
        ctx.save();
        this.rotate(ctx, x, y);

        const points = this.points;
        
        this.drawShape(ctx, points)
    
        ctx.restore();
    }

    rotate(ctx, x, y) {
        const angle = Helper.Movement.getRotationAngle(this);
        ctx.translate(x, y);
        ctx.rotate(angle);
    }

    rotateVertexArr(points) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];

            point.rotate(Helper.Math.Trig.getAngleBetweenPoints(point, Helper.Cursor.mouseC));

            
        }
    }

    drawShip(ctx) {
        const angle = Helper.Movement.getRotationAngle(this);

        ctx.save();
        this.drawShape(ctx);
        ctx.restore();
    }

    getVertexPoints() {
        const externalAngle = 120 * (Math.PI / 180);

        const p1 = new Point2d(0, 0 + this.radius);
        const p2 = new Point2d(p1.x * Math.cos(externalAngle) - (p1.y * Math.sin(externalAngle)), p1.x * Math.sin(externalAngle) + (p1.y * Math.cos(externalAngle)));
        const p3 = new Point2d(p1.x * Math.cos(externalAngle * 2) - (p1.y * Math.sin(externalAngle * 2)), p1.x * Math.sin(externalAngle * 2) + (p1.y * Math.cos(externalAngle * 2)));
        return [p1, p2, p3];
    }

    update(dt) {

        
        this.shootProjectile(dt);
        Helper.Movement.wrap(this, canvas)
        Helper.Movement.moveTowardsCursor(dt, this);
    }

    shootProjectile(dt) {
        this.checkCooldown(dt);
        const mouseX = Helper.Cursor.getX();
        const mouseY = Helper.Cursor.getY();
        if (this.hasShot === false && Helper.Cursor.isMouseDown) {
            const angle = Math.atan2(mouseX - this.pos.x, mouseY - this.pos.y);
            const bullet = new Projectile(this.pos.x, this.pos.y, angle);
            engine.addEntity(bullet);
            this.hasShot = true;
        }
    }

    checkCooldown(dt) {
        if (this.hasShot) {
            if (this.cooldown > 0) {
                this.cooldown -= dt;
            } else {
                this.hasShot = false;
                this.cooldown = this.cooldownOrig;
            }
        }
    }
}