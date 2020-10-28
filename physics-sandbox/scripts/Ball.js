import { canvasElem } from "/physics-sandbox/scripts/app.js";
import { keyArr } from "/physics-sandbox/scripts/app.js";
import { platform1 } from "/physics-sandbox/scripts/app.js";


export class Ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.g = 9.81;
        this.vy = 0;
        this.vx = 0;
        this.speedMult = 0;
        this.drag = 10;
        this.gracePeriod;
        this.wallGrabPeriod;
    }

    physics(delta) {
        this.gravity(delta);

    }

    update(delta) {
        this.movementHandler(delta);
        this.movement(delta);

    }

    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }

    gravity(delta) {
        this.vy += this.g;
        this.y += this.vy * delta;

        if (this.gracePeriod > 0) {
            this.gracePeriod -= delta;

        }

        if (this.y + this.rad > canvasElem.height) {
            this.vy *= -0.2;
            this.y = canvasElem.height - this.rad;
            this.gracePeriod = delta * 8;

        }
        if (this.y - this.rad < 0) {
            this.vy *= -0.2;
            this.y = this.rad;
        }
    }

    movement(delta) {
        this.wallGrabPeriod -= delta;
        this.x += this.vx * delta;
        this.vx *= 1 - delta * this.drag * 0.01;

        if (this.y === canvasElem.height - this.rad) {

            this.wallGrabPeriod = delta * 8;
            console.log(this.wallGrabPeriod);

            if (!(keyArr.includes("ArrowLeft")) && !(keyArr.includes("ArrowRight"))) {
                this.vx *= 1 - delta * this.drag
                if (this.speedMult > 0.5) {
                    this.speedMult = 0.5;
                }
            } else {
                if (this.speedMult < delta * 125) {
                    this.speedMult += delta * 4;
                }
            }

        }

        if (this.x + this.rad > canvasElem.width || this.x - this.rad <= 0) {
            this.wallGrabPeriod -= delta;
            console.log(this.wallGrabPeriod);
        }

        if (this.x + this.rad > canvasElem.width) {
 
            this.x = canvasElem.width - this.rad;

            this.speedMult = 1;
            
        } else if (this.x - this.rad <= 0) {

            this.x = this.rad;
            
            this.speedMult = 1;
        }
    }

    movementHandler(delta) {
        if (keyArr.includes("ArrowUp")) {
            if (this.gracePeriod > 0 || this.wallGrabPeriod > 0) {
                this.vy = -250;
            }
        }

        if (keyArr.includes("ArrowLeft") && (this.x > this.rad)) {
            if ((this.y === canvasElem.height - this.rad)) {
                this.vx = -200 * this.speedMult;
            } else if (this.wallGrabPeriod > 0) {
                this.vx = -200 * this.speedMult;
            }  else if (this.vx > -250) {
                this.vx -= 25;
            }



        }

        if (keyArr.includes("ArrowRight") && (this.x < (canvasElem.width - this.rad))) {
            if ((this.y === canvasElem.height - this.rad)) {
                this.vx = 200 * this.speedMult;
            } else if (this.wallGrabPeriod > 0) {
                this.vx = 200 * this.speedMult;
            } else if (this.vx < 250) {
                this.vx += 25;
            }
        }
    }



}