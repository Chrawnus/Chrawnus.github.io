import { canvasElem } from "/physics-sandbox/scripts/app.js";
import { RigidBody } from "/physics-sandbox/scripts/RigidBody.js";
import { keyArr } from "/physics-sandbox/scripts/app.js";

export class Ball extends RigidBody {
    constructor(x, y, rad) {
        super(x, y);
        this.rad = rad;
        this.gracePeriod;
    }

    update(delta) {
        super.movement(delta);
        this.movementHandler(delta);
    }

    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }

    movementHandler() {
        //console.log(`x: ${this.x}, y: ${this.y}`)
        if (this.x + this.rad > canvasElem.width) {
            this.x = canvasElem.width - this.rad;
            this.speedMult = 1;

        } else if (this.x - this.rad <= 0) {

            this.x = this.rad;
            this.speedMult = 1;
        }

        if (keyArr.includes("ArrowUp")) {
            if (this.gracePeriod > 0) {
                this.vy = -600;
            }
        }

        if (keyArr.includes("ArrowLeft") && !(keyArr.includes("ArrowRight")) && (this.x > this.rad)) {
            if (this.vx > -600) {
                this.vx -= 50;
            }
        }

        if (keyArr.includes("ArrowRight") && !(keyArr.includes("ArrowLeft")) && (this.x < (canvasElem.width - this.rad))) {
            if (this.vx < 600) {
                this.vx += 50;
            }
        }
    }



}