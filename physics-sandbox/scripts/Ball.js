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
        this.drag = 1;
        this.gracePeriod;
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
        if (!(this.y + this.rad >= canvasElem.height)) {
            this.g = 9.81;
        }
        this.vy += this.g;

        this.vx *= 1 - delta * this.drag * 0.01;
        
        if (this.speedMult > 50 * delta) {
            this.speedMult = 50 * delta;
        }

        if (this.gracePeriod > 0) {
            
            this.gracePeriod -= delta;
            
            if (Math.abs(this.vy) < this.g*2.5) {
                this.g = 0;
                if (this.vy <= 9.81) {

                    this.g = 0;
                    this.vy = 0;
                }

            }
        }


        if (this.y + this.rad >= canvasElem.height) {
            
            if (Math.abs(this.vy) <= 9.81) {
                this.vy = 0;
                this.g = 0;
            }
            this.y = canvasElem.height - this.rad;
            if (Math.abs(this.vy) > this.g) {
                console.log(this.vy);
                console.log("hej")
                this.vy *= -0.9;
            }
            
            this.gracePeriod = delta * 8;
            this.vx *= 1 - delta * this.drag;
            if (Math.abs(this.vy) <= 9.81) {
                this.g = 0;
                this.vy = 0;
            }
            

            

            if (!(keyArr.includes("ArrowLeft")) != !(keyArr.includes("ArrowRight"))) {
                if (this.speedMult < delta * 450) {
                    this.speedMult += delta * 15;
                }
            }

        }
        if (this.y - this.rad < 0) {
            this.vy *= -0.9;
            this.y = this.rad;
        }





        if (this.y === canvasElem.height - this.rad) {

        }

        if (this.x + this.rad >= canvasElem.width || this.x - this.rad <= 0) {
            this.vx *= -0.9;

        }
    }

    movement(delta) {

        let distance = this.vy * delta;
        this.y += distance;

        this.x += this.vx * delta;



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
            if (this.gracePeriod > 0) {
                this.vy = -600;
            }
        }

        if (keyArr.includes("ArrowLeft") && !(keyArr.includes("ArrowRight")) && (this.x > this.rad)) {
            if ((this.y === canvasElem.height - this.rad) && this.vx > -600) {
                this.vx -= 50;
            }



        }

        if (keyArr.includes("ArrowRight") && !(keyArr.includes("ArrowLeft")) && (this.x < (canvasElem.width - this.rad))) {
            if ((this.y === canvasElem.height - this.rad) && this.vx < 600) {
                this.vx += 50;
            }
        }
    }



}