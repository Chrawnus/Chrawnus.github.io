import { canvasElem } from "/physics-sandbox/scripts/app.js";
import { RigidBody } from "/physics-sandbox/scripts/RigidBody.js";
import { keyArr } from "/physics-sandbox/scripts/app.js";

export class Ball extends RigidBody {
    constructor(x, y, density, rad) {
        super(x, y, density);
        this.rad = rad;
        this.area = Math.PI*(this.rad*this.rad);
        this.mass = this.area * this.density;
        this.gracePeriod;
    }

    update(delta) {
        super.movement(delta);
        this.movementHandler(delta);
        super.sleepTimer(delta);
    }

    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        if (this.isAwake)
        {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "red";
        }
        
        ctx.fill();
        ctx.stroke();
    }

    movementHandler() {
        //console.log(`x: ${this.x}, y: ${this.y}`)
        if (this.isAwake = false) {
            this.vy = 0;
            this.vx = 0;
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