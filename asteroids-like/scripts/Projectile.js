import { engine } from "./app.js"
import { Point2d } from "./Point2d.js";

export class Projectile {
    constructor(x, y, velocity, angle){
        this.pos = new Point2d(x, y);
        this.velocity = velocity;
        this.angle = angle;
        this.lifetime = 0.6;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 4, 0, Math.PI*2, false);

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
    }

    updatePos(dt) {
        this.pos.x += this.velocity * 5 * Math.sin(this.angle) * dt;
        this.pos.y += this.velocity * 5 * Math.cos(this.angle) * dt;
    }

    updateLifetime(dt) {
        if (this.lifetime <= 0) {
            console.log("hi")
        } else {
            this.lifetime -= dt;
        }
    }
}