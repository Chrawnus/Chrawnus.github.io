import { Point2d } from "./Point2d.js";
import { canvas } from "./Elements.js";

export class Projectile {
    constructor(x, y, angle){
        this.pos = new Point2d(x, y);
        this.radius = 4;
        this.velocity = 1600;
        this.angle = angle;
        this.lifetime = 0.6;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2, false);

        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update(dt) {
        this.updateLifetime(dt)
        this.updatePos(dt)
        this.wrap();
    }

    updatePos(dt) {
        this.pos.x += this.velocity * Math.sin(this.angle) * dt;
        this.pos.y += this.velocity * Math.cos(this.angle) * dt;
    }

    updateLifetime(dt) {
        if (this.lifetime <= 0) {
        } else {
            this.lifetime -= dt;
        }
    }

    wrap() {
        if (this.pos.x > canvas.width + this.radius) {
            this.pos.x = -this.radius;
        } else if (this.pos.x < -this.radius) {
            this.pos.x = canvas.width + this.radius
        }

        if (this.pos.y > canvas.height + this.radius) {
            this.pos.y = -this.radius;
        } else if (this.pos.y < -this.radius) {
            this.pos.y = canvas.height + this.radius;
        }
    }
}