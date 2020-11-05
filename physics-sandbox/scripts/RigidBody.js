import { canvasElem } from "/physics-sandbox/scripts/app.js";

export class RigidBody {
    constructor(x, y, density) {
        this.prevX;
        this.prevY;
        this.timer = 0;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.drag = 1;
        this.restitution = -0.8;
        this.awake = true;
        this.density = density;
    }

    get isAwake() {
        return this.timer < 5;
    }
    set isAwake(value) {
        this.sleepTimer = value ? 0 : 1;
    }

    sleepTimer(delta) {
        if (!this.prevX) { this.prevX = this.x }
        if (!this.prevY) { this.prevY = this.y }
        let diffX = Math.abs(this.x - this.prevX);
        let diffY = Math.abs(this.y - this.prevY);
        let diffPos = Math.sqrt(diffX * diffX + diffY * diffY);
        this.prevX = this.x;
        this.prevY = this.y;


        if (diffPos < 2) {
            this.timer += delta;

        } else {
            this.timer = 0;
        }
    }

    update(delta) {
        this.movement(delta);
        this.sleepTimer(delta);
    }

    movement(delta) {
        
            this.y += this.vy * delta;
            this.x += this.vx * delta;
        

    }
}