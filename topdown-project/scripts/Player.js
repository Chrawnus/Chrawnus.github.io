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
        this.area = Math.PI*(this.rad*this.rad);
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
        this.movementHandler();
        this.sleepTimer(delta);
        
    }

    movement(delta) {
        
            this.y += this.vy * delta;
            this.x += this.vx * delta;
        

    }

    draw(ctx) {
        const radPos = this.getLineCircleIntersect(this, mousecoords, this.rad);
        
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

    getMouseDistance() {
        
        console.log(length);
    }


    movementHandler() {
        
        if (keyArr.includes("w") ) {
                this.y -= 5;
        }

        if (keyArr.includes("s") ) {
            this.y += 5;
    }

        if (keyArr.includes("a") && !(keyArr.includes("d")) ) {
                this.x -= 5;
        }

        if (keyArr.includes("d") && !(keyArr.includes("a")) ) {
                this.x += 5;
        }
    }

    getLineCircleIntersect(p0, p1, r) {
        const theta = Math.atan2(p1.y-p0.y, p1.x-p0.x)
        return {
            x: p0.x + r * Math.cos(theta),
            y: p0.y + r * Math.sin(theta)
        }

    }

    getClippingPath(ctx) {
        const radPos = this.getLineCircleIntersect(this, mousecoords, this.rad);


        ctx.beginPath();
        
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad * 24, Math.atan2(radPos.y - this.y, radPos.x - this.x) - (30 * Math.PI/ 180), Math.atan2(radPos.y - this.y, radPos.x - this.x) + (30 * Math.PI/ 180) );
        ctx.lineTo(this.x, this.y);
        //ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        
        ctx.arc(this.x, this.y, this.rad, Math.atan2(radPos.y - this.y, radPos.x - this.x) - (30 * Math.PI/ 180), Math.atan2(radPos.y - this.y, radPos.x - this.x) + (30 * Math.PI/ 180),  true);
        ctx.stroke();


    }

}


