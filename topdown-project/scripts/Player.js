import { canvasElem } from "/topdown-project/scripts/app.js";
import { mousecoords } from "/topdown-project/scripts/app.js";

import { keyArr } from "/topdown-project/scripts/app.js";

export class Player {
    constructor(x, y, rad) {
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
        this.rad = rad;
        this.area = Math.PI * (this.rad * this.rad);
        this.previousmousecoords = {
            x: 0,
            y: 0
        };

        this.offset = {
            x: 0,
            y: 0
        };

        this.target = {
            x: 0,
            y: 0
        };
    }



    update(delta) {

        this.offset.x += mousecoords.x - this.previousmousecoords.x;
        this.offset.y += mousecoords.y - this.previousmousecoords.y;

        const targetcircle = {
            x: this.x + this.offset.x,
            y: this.y + this.offset.y,
            rad: 1
        };

        const clampingCircle = {
            x: this.x,
            y: this.y,
            rad: this.rad * 24,
        }

        if (this.circleCircleCollision(targetcircle, clampingCircle)) {
            this.target.x = this.x + this.offset.x;
            this.target.y = this.y + this.offset.y;
        } else {
           const targetPosition = this.getLineCircleIntersect(clampingCircle, targetcircle, clampingCircle.rad);
           this.target.x = targetPosition.x;
           this.target.y = targetPosition.y;
        }
        


        this.previousmousecoords.x = mousecoords.x;
        this.previousmousecoords.y = mousecoords.y;


        this.movement(delta);
        this.movementHandler();
    }

    movement(delta) {

        this.y += this.vy * delta;
        this.x += this.vx * delta;


    }

    draw(ctx) {
        const radPos = this.getLineCircleIntersect(this, this.target, this.rad);

        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);

        ctx.fillStyle = "green";


        ctx.fill();
        ctx.stroke();

        ctx.beginPath(this.target.x, this.target.y);
        ctx.arc(this.target.x, this.target.y, 5, 0, Math.PI * 2, true);

        ctx.fillStyle = "green";


        ctx.fill();
        ctx.stroke();



    }

    getMouseDistance() {

        console.log(length);
    }


    movementHandler() {

        if (keyArr.includes("w")) {
            this.y -= 2.5;
        }

        if (keyArr.includes("s")) {
            this.y += 2.5;
        }

        if (keyArr.includes("a") && !(keyArr.includes("d"))) {
            this.x -= 2.5;
        }

        if (keyArr.includes("d") && !(keyArr.includes("a"))) {
            this.x += 2.5;
        }
    }

    getLineCircleIntersect(p0, p1, r) {
        const theta = Math.atan2(p1.y - p0.y, p1.x - p0.x)
        return {
            x: p0.x + r * Math.cos(theta),
            y: p0.y + r * Math.sin(theta)
        }

    }

    getClippingPath(ctx) {
        const radPos = this.getLineCircleIntersect(this, this.target, this.rad);


        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad * 24, Math.atan2(radPos.y - this.y, radPos.x - this.x) - (30 * Math.PI / 180), Math.atan2(radPos.y - this.y, radPos.x - this.x) + (30 * Math.PI / 180));
        ctx.lineTo(this.x, this.y);
        //ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);

        ctx.arc(this.x, this.y, this.rad, Math.atan2(radPos.y - this.y, radPos.x - this.x) - (30 * Math.PI / 180), Math.atan2(radPos.y - this.y, radPos.x - this.x) + (30 * Math.PI / 180), true);
        ctx.stroke();


    }

    circleCircleCollision(c1, c2,) {
        const a = c1.x - c2.x;
        const b = c1.y - c2.y;
        const rad = c1.rad + c2.rad;


        return ((a * a + b * b) < rad * rad);
    }


}


