import { canvasElem } from "/physics-sandbox/scripts/app.js";

export class Ball {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.then = Date.now();
        this.time = Date.now();
        this.g = 0.5;
        this.vel = 0;
        this.bounced = 0;
        this.prevBounced = 0;
    }


    physics() {
        let delta = this.setDelta();
        

        if (!(this.collisionDetection(this.x, canvasElem.height))) {
            let elapsedTime = this.getTime(this.time);
            if (this.bounced > this.prevBounced) {
                elapsedTime = this.getTime(Date.now());
                this.y += this.g * elapsedTime * delta;
                console.log(this.bounced, this.prevBounced);
            } else {
                elapsedTime = this.getTime(this.time)
                this.y += this.g * elapsedTime * delta;
            }
            
            //console.log(elapsedTime);   
        }

        else if ((this.collisionDetection(this.x, canvasElem.height))) {
            this.y += (this.g) * -0.8 * delta;
            this.prevBounced = this.bounced;
            this.bounced += 1;
            console.log(this.bounced, this.prevBounced);

        }
    }


    update() {

    }

    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }


    collisionDetection(x, y) {
        let a = Math.abs(this.x - x);
        let b = Math.abs(this.y - y);

        return (Math.sqrt(a * a + b * b) <= this.rad);
    }

    setDelta() {
        let now = Date.now();
        let delta = (now - this.then) / 1000; // seconds since last frame
        this.then = now;
        return delta;
    }

    getTime(then) {
        let now = Date.now();
        let elapsedTime = now - then;
        return elapsedTime;
    }
}