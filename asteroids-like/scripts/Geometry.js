import { Point2d } from "./Point2d.js";
import { Helper } from "./helperFunctions.js";

export class Geometry {
    constructor(pos, sideNumber, radius) {
        this.pos = pos;
        this.sideNumber = sideNumber;
        this.radius = radius;
        this.strokeStyle = "white";
        this.isColliding = false;
    }

    addOffsets() {
        const offsetArr = []
        for (let i = 0; i < this.sideNumber; i++) {
            offsetArr[i] = Helper.getRandomArbitrary(-10, 10);
        }
        return offsetArr;
    }

    update(dt) {
        this.move(dt)
        this.wrap();
        console.log()
        
    }

    draw(ctx) {
        let x = this.pos.x;
        let y = this.pos.y;

        ctx.save();
        ctx.translate(x, y)
        const points = this.points;

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
            
            const r = this.radius;
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
        
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = 1;

        ctx.stroke();
        ctx.closePath();
    }
}