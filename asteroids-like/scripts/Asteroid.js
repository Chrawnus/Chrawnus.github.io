import { Point2d } from "./Point2d.js";
import { Helper } from "./helperFunctions.js";
import { canvas } from "./Elements.js";
import { Vector } from "./Vector.js";
import { helper } from "./app.js";
export class Asteroid {
    constructor() {
        this.x = Helper.getRandomArbitrary(0, canvas.width)
        this.y = Helper.getRandomArbitrary(0, canvas.height);
        this.sideLength = Helper.getRandomArbitrary(20, 50);
        this.sideNumber = Math.floor(Helper.getRandomArbitrary(5, 15));
        this.radius = Helper.getRandomArbitrary(15, 50);
        this.offset = this.addOffsets();
        this.angle = Helper.getRandomArbitrary(0, Math.PI*2);
        this.speed = Helper.getRandomArbitrary(150, 250);
    }

    addOffsets() {
        const offsetArr = []
        for (let i = 0; i < this.sideNumber; i++) {
            offsetArr[i] = Helper.getRandomArbitrary(-10, 10);
        }
        return offsetArr;
    }

    getVelocity() {
        const Vel = new Vector(this.x + (Helper.getRandomArbitrary(-300, 300)), this.y + (Helper.getRandomArbitrary(-300, 300)))
        return Vel;
    }


    update(dt) {
        this.move(dt)
        this.wrap();
    }

    draw(ctx) {
        let x = this.x;
        let y = this.y;
        ctx.save();
        ctx.translate(x, y)
        const points = this.getCoordsFromAngle();
        this.drawShape(ctx, points)
        ctx.restore();
    }

    //Determine the endpoint of a line given an angle, length,
    //and starting point [x, y]
    getCoordsFromAngle() {
        const pArr = [];
        let angleTotal = Math.PI*2;
        for (let i = 0; i < this.sideNumber; i++) {
            let angle = angleTotal * (i/this.sideNumber);
            
            const r = this.radius + this.offset[i];
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            const point = new Point2d(x, y)
            pArr.push(point)
        }
        
        return pArr
    }

    drawShape(ctx, points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[0].x, points[0].y);
        
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

        ctx.stroke();
        ctx.closePath();
    }

    wrap() {
        if (this.x > canvas.width + this.radius) {
            this.x = -this.radius;
        } else if (this.x < -this.radius) {
            this.x = canvas.width + this.radius
        }

        if (this.y > canvas.height + this.radius) {
            this.y = -this.radius;
        } else if (this.y < -this.radius) {
            this.y = canvas.height + this.radius;
        }
    }

    move(dt) {
        this.x += this.speed * Math.sin(this.angle) * dt;
        this.y += this.speed * Math.cos(this.angle) * dt;
    }


}