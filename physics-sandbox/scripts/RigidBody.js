import { canvasElem } from "/physics-sandbox/scripts/app.js";

export class RigidBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.drag = 1;
        this.restitution = 0.8;
        this.awake = true;
    }

    update(delta) {
        this.movement(delta);
    }

    movement(delta) {
        this.y += this.vy * delta;
        this.x += this.vx * delta;
    }
}