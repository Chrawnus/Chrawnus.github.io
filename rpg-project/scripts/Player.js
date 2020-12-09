import { canvasElem } from "/rpg-project/scripts/app.js";
import { mousecoords } from "/rpg-project/scripts/app.js";

import { keyArr } from "/rpg-project/scripts/app.js";

export class Player {
    constructor(x, y, rad) {
        this.prevPos = {
            x: undefined,
            y: undefined
        }

        this.elevation;
        
        this.timer = 0;
        this.velocity = 250;
        this.pos = {
            x: x,
            y: y
        }

        this.dx = 0;
        this.dy = 0;
        this.vx = 0;
        this.vy = 0;
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
            "pos": {
                x: this.pos.x,
                y: this.pos.y
            },
            "rad": 5

        };

        this.clampingCircle = {
            x: this.pos.x,
            y: this.pos.y,
            rad: this.rad * 2,
        }
    }



    update(delta) {

/*         this.offset.x += mousecoords.x - this.previousmousecoords.x;
        this.offset.y += mousecoords.y - this.previousmousecoords.y; */
        
        
/*         this.offset.x += mousecoords.x
        this.offset.y += mousecoords.y

        

        const targetcircle = {
            x: this.pos.x + this.offset.x,
            y: this.pos.y + this.offset.y,
            rad: 1
        };



         if (this.circleCircleCollision(targetcircle, this.clampingCircle)) {
            this.target.x = this.pos.x + this.offset.x;
            this.target.y = this.pos.y + this.offset.y;
        } else { 
           const targetPosition = this.getLineCircleIntersect(this.clampingCircle, targetcircle, this.clampingCircle.rad);
           this.target.x = targetPosition.x;
           this.target.y = targetPosition.y;
         } */
        


/*         this.previousmousecoords.x = mousecoords.x;
        this.previousmousecoords.y = mousecoords.y; */


        this.movementHandler();
        this.movement(delta);
        
    }

    movementHandler(delta) {
        if (keyArr.includes("w") && !(keyArr.includes("s"))) {
            if (!(keyArr.includes(" "))) {this.vy = -this.velocity;}
            
            if (keyArr.includes("a") || keyArr.includes("d")) {
                this.target.pos.y = this.pos.y - this.clampingCircle.rad;
            } else {
                this.target.pos.y = this.pos.y - this.clampingCircle.rad;
                this.target.pos.x = this.pos.x;
            }
        } else if (keyArr.includes("s") && !(keyArr.includes("w"))) {
            if (!(keyArr.includes(" "))) {this.vy = +this.velocity;}
            
            if (keyArr.includes("a") || keyArr.includes("d")) {
                this.target.pos.y = this.pos.y + this.clampingCircle.rad;
            } else {
                this.target.pos.y = this.pos.y + this.clampingCircle.rad;
                this.target.pos.x = this.pos.x;
            }
            
        } else {
            this.vy = 0;
            //this.target.y = this.pos.y;
        }
        
        if (keyArr.includes("a") && !(keyArr.includes("d"))) {
            if (!(keyArr.includes(" "))) {this.vx = -this.velocity;}
            
            if (keyArr.includes("w") || keyArr.includes("s")) {
                this.target.pos.x = this.pos.x - this.clampingCircle.rad;
            } else {
                this.target.pos.x = this.pos.x - this.clampingCircle.rad;
                this.target.pos.y = this.pos.y;
            }
            
            
        } else if (keyArr.includes("d") && !(keyArr.includes("a"))) {
            if (!(keyArr.includes(" "))) {this.vx = +this.velocity;}

            if (keyArr.includes("w") || keyArr.includes("s")) {
                this.target.pos.x = this.pos.x + this.clampingCircle.rad;
            } else {
                this.target.pos.x = this.pos.x + this.clampingCircle.rad;
                this.target.pos.y = this.pos.y;
            }
            
        } else {
            this.vx = 0;
            //this.target.x = this.pos.x;
        }

    }

    movement(delta) {
        
        this.pos.y += this.vy * delta;
        this.pos.x += this.vx * delta;


    }


    draw(ctx) {
        const radPos = this.getLineCircleIntersect(this, this.target.pos, this.rad);

        ctx.beginPath(this.pos.x, this.pos.y);
        ctx.arc(this.pos.x, this.pos.y, this.rad, 0, Math.PI * 2, true);

        ctx.fillStyle = "green";


        ctx.fill();
        ctx.stroke();

        ctx.beginPath(this.target.pos.x, this.target.pos.y);
        ctx.arc(this.target.pos.x, this.target.pos.y, 5, 0, Math.PI * 2, true);

        ctx.fillStyle = "green";


        ctx.fill();
        ctx.stroke();

        ctx.beginPath(mousecoords.x, mousecoords.y);
        ctx.arc(mousecoords.x, mousecoords.y, 5, 0, Math.PI * 2, true);

        ctx.fillStyle = "green";


        ctx.fill();
        ctx.stroke();

    }






    getLineCircleIntersect(p0, p1, r) {
        const theta = Math.atan2(p1.y - p0.y, p1.x - p0.x)
        return {
            x: p0.x + r * Math.cos(theta),
            y: p0.y + r * Math.sin(theta)
        }

    }

    getClippingPath(ctx) {
        const radPos = this.getLineCircleIntersect(this, this.target.pos, this.rad);


        ctx.beginPath();

        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.arc(this.pos.x, this.pos.y, this.rad * 24, Math.atan2(radPos.y - this.pos.y, radPos.x - this.pos.x) - (30 * Math.PI / 180), Math.atan2(radPos.y - this.pos.y, radPos.x - this.pos.x) + (30 * Math.PI / 180));
        ctx.lineTo(this.pos.x, this.pos.y);
    
        

        ctx.arc(this.pos.x, this.pos.y, this.rad, Math.atan2(radPos.y - this.pos.y, radPos.x - this.pos.x) - (30 * Math.PI / 180), Math.atan2(radPos.y - this.pos.y, radPos.x - this.pos.x) + (30 * Math.PI / 180), true);
        ctx.stroke();


    }

    circleCircleCollision(c1, c2,) {
        const a = c1.x - c2.x;
        const b = c1.y - c2.y;
        const rad = c1.rad + c2.rad;


        return ((a * a + b * b) < rad * rad);
    }

    getPrevXAndPrevY() {
        if (!this.prevPos.x) { this.prevPos.x = this.pos.x; }
        if (!this.prevPos.y) { this.prevPos.y = this.pos.y; }
        
        this.dx = this.pos.x - this.prevPos.x;
        this.dy = this.pos.y - this.prevPos.y;

        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
        }



}


