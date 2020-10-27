import { canvasElem } from "/physics-sandbox/scripts/app.js";
import { keyArr } from "/physics-sandbox/scripts/app.js";
import { platform1 } from "/physics-sandbox/scripts/app.js";


export class Ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.g = 3;
        this.vy = 0;
        this.vx = 0;
        this.velocity = 150;
        this.drag = 1;
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


        if (this.y + this.rad > canvasElem.height) {
            this.vy *= -0.2;
            this.y = canvasElem.height - this.rad;
        }
        if (this.y - this.rad < 0) {
            this.vy *= -0.2;
            this.y = this.rad;
        }
        if (this.collisionDetectionFloor(platform1)) {
            this.vy *= -0.2;
            this.y = platform1.y - this.rad;
        }
        if (this.collisionDetectionRoof(platform1)) {
            this.vy *= -0.2;
            this.y = (platform1.y + platform1.height) + this.rad;
        }
    }

    movement(delta) {
        this.x += this.vx * delta;
        this.vx *= 1 - delta * this.drag *0.01;

        if (this.y === canvasElem.height - this.rad || this.collisionDetectionFloor(platform1) ) {
            this.vx *= 1 - delta * this.drag
        }

        
        if (this.x + this.rad > canvasElem.width) {
            this.vx *= -0.2;
            this.x = canvasElem.width - this.rad;
        } else if (this.x - this.rad <= 0) {
            this.vx *= -0.2;
            this.x = this.rad;
        }
    }

    movementHandler() {
        if (keyArr.includes("ArrowUp")) {
            if ((this.y >= canvasElem.height - this.rad - 1) || this.collisionDetectionFloor(platform1)) {
                this.vy = -150;
            } 
        }

        if (keyArr.includes("ArrowLeft") && (this.x > this.rad)) {
            if ((this.y == canvasElem.height - this.rad)) {
                this.vx = -50;
            } else {
                this.vx = -25;
            }
        }
        if (keyArr.includes("ArrowRight") && (this.x < (canvasElem.width - this.rad))) {
            if ((this.y == canvasElem.height - this.rad)) {
                this.vx = 50;
            } else {
                this.vx = 25;
            }
        }
    }


    collisionDetectionFloor(platform) {
        return !(
            ((this.y + this.rad) < (platform.y)) ||
            (this.y > (platform.y)) ||
            ((this.x + this.rad/2) < platform.x) ||
            (this.x > (platform.x + platform.width))
        );
    }

    collisionDetectionRoof(platform) {
        return !(
            ((this.y - this.rad) > (platform.y + platform.height))
        );
    }
}