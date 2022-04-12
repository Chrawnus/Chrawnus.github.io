import { Point2d } from "./Point2d.js";
import { helper } from "./app.js";
import { Helper } from "./helperFunctions.js";
import { Projectile } from "./Projectile.js";
import { engine } from "./app.js";
import { canvas } from "./Elements.js";

export class Player {
    constructor(x, y, radius) {
        this.pos = new Point2d(x, y)
        this.radius = radius;
        this.hitboxRadius = radius*0.50;
        this.internalAngle = 60 * (Math.PI / 180);
        this.externalAngle = 120 * (Math.PI / 180);
        this.strokeStyle = "white";
        this.speed = 250;
        this.isMouseDown = false;
        this.hasShot = false;
        this.cooldown = 0.4;
        this.cooldownOrig = 0.4;
    }



    draw(ctx) {
        this.drawCursorPosition(ctx);
        this.drawShip(ctx);
    }

    drawShip(ctx) {
        const angle = helper.getRotationAngle(this);

        ctx.save();
        
        this.rotate(ctx, angle);

        const { p1, p2, p3 } = this.getVertexPoints();

        ctx.beginPath();
        this.connectVertexPoints(ctx, p1, p2, p3);
        this.drawShape(ctx);
        ctx.closePath();
        ctx.restore();
    }

    drawShape(ctx) {
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    connectVertexPoints(ctx, p1, p2, p3) {
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p1.x, p1.y);
    }

    getVertexPoints() {
        const p1 = new Point2d(0, 0 + this.radius);
        const p2 = new Point2d(p1.x * Math.cos(this.externalAngle) - (p1.y * Math.sin(this.externalAngle)), p1.x * Math.sin(this.externalAngle) + (p1.y * Math.cos(this.externalAngle)));
        const p3 = new Point2d(p1.x * Math.cos(this.externalAngle * 2) - (p1.y * Math.sin(this.externalAngle * 2)), p1.x * Math.sin(this.externalAngle * 2) + (p1.y * Math.cos(this.externalAngle * 2)));
        return { p1, p2, p3 };
    }

    rotate(ctx, angle) {
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(angle);
    }

    drawCursorPosition(ctx) {
        ctx.beginPath();
        ctx.moveTo(helper.mouseC.x, helper.mouseC.y);
        ctx.arc(helper.mouseC.x, helper.mouseC.y, 2, 0, Math.PI * 2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    update(dt) {

        this.checkCooldown(dt);
        this.shootProjectile();
        this.wrap();
        this.moveTowardsCursor(dt);
    }

    shootProjectile() {
        if (this.hasShot === false && Helper.isMouseDown) {
            const angle = Math.atan2(helper.mouseC.x - this.pos.x, helper.mouseC.y - this.pos.y);
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

    moveTowardsCursor(dt) {
        const dx = helper.mouseC.x - this.pos.x;
        const dy = helper.mouseC.y - this.pos.y;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(helper.mouseC.x - this.pos.x, helper.mouseC.y - this.pos.y);

        this.pos.x += distance * 1.5 * Math.sin(angle) * dt;
        this.pos.y += distance * 1.5 * Math.cos(angle) * dt;
    }

    wrap() {
        if (this.x > canvas.width + this.radius) {
            this.x = -this.radius;
        } else if (this.x < -this.radius) {
            this.x = canvas.width + this.radius
        }

        if (this.y > canvas.height + this.radius) {
            this.y = -this.radius;
        } else if (this.y < -this.radius) {
            this.y = canvas.height + this.radius;
        }
    }
}