import { Point2d } from "./Point2d.js";
import { Helper } from "./helperFunctions.js";
import { canvas } from "./Elements.js";
import { Vector } from "./Vector.js";

export class Asteroid {
    constructor() {
        this.pos = new Point2d(Helper.getRandomArbitrary(0, canvas.width), Helper.getRandomArbitrary(0, canvas.height));
        this.sideLength = Helper.getRandomArbitrary(20, 50);
        this.sideNumber = Math.floor(Helper.getRandomArbitrary(5, 15));
        this.radius = Helper.getRandomArbitrary(15, 50);
        this.hitboxRadius = this.radius;
        this.offset = this.addOffsets();
        this.angle = Helper.getRandomArbitrary(0, Math.PI*2);
        this.speed = Helper.getRandomArbitrary(150, 250);
        this.rotationSpeed = Helper.getRandomArbitrary((Math.PI*2*0.005) * -1, Math.PI*2*0.005);
        this.points = this.getVertexPoints();
    }

    addOffsets() {
        const offsetArr = []
        for (let i = 0; i < this.sideNumber; i++) {
            offsetArr[i] = Helper.getRandomArbitrary(-10, 10);
        }
        return offsetArr;
    }

    getVelocity() {
        const Vel = new Vector(this.pos.x + (Helper.getRandomArbitrary(-300, 300)), this.pos.y + (Helper.getRandomArbitrary(-300, 300)))
        return Vel;
    }


    update(dt) {
        this.move(dt)
        this.wrap();
    }

    draw(ctx) {
        let x = this.pos.x;
        let y = this.pos.y;

        ctx.save();
        ctx.translate(x, y)
        const points = this.points;
        
        this.rotateVertexArr(points)
        this.drawShape(ctx, points)
    
        ctx.restore();

    }

    //Determine the endpoint of a line given an angle, length,
    //and starting point [x, y]
    getVertexPoints() {
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

    rotateVertexArr(points) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            point.rotate(this.rotationSpeed);
        }
    }

    drawShape(ctx, points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[0].x, points[0].y);
        
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = 1;

        ctx.stroke();
        ctx.closePath();
    }

    wrap() {
        if (this.pos.x > canvas.width + this.radius) {
            this.pos.x = -this.radius;
        } else if (this.pos.x < -this.radius) {
            this.pos.x = canvas.width + this.radius
        }

        if (this.pos.y > canvas.height + this.radius) {
            this.pos.y = -this.radius;
        } else if (this.pos.y < -this.radius) {
            this.pos.y = canvas.height + this.radius;
        }
    }

    move(dt) {
        this.pos.x += this.speed * Math.sin(this.angle) * dt;
        this.pos.y += this.speed * Math.cos(this.angle) * dt;
    }


}