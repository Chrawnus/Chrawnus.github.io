import { canvasElem } from "./app.js";

export class Square {
    constructor(x, y, length, mass, vel) {
        this.x = x;
        this.y = y; 
        this.length = length;
        this.mass = mass;
        this.vel = vel;
    }

    update(dt) {
        if (this.y > canvasElem.height - this.length || this.y < canvasElem.height - this.length) {
            this.y = canvasElem.height - this.length;
        }

        this.x += this.vel*dt;

        if (this.x < 0) {
            this.vel *= -1;
        }
    }

    collide(other) {
        return (this.x < other.x + other.length || this.x + this.length > other.x);
    }

    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.rect(this.x, this.y, this.length, this.length, this.height);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }

}