import { Point2d } from "./Point2d.js";
import { Draw } from "./Draw.js";
import { Helper } from "./helperFunctions.js";

export class Geometry {
    constructor(pos, sideNumber, radius) {
        this.angle = 0;
        this.pos = pos;
        this.sideNumber = sideNumber;
        this.offsets = new Array(this.sideNumber).fill(0);
        this.radius = radius;
        this.strokeStyle = "white";
        this.isColliding = false;
        this.rotationAngle = 0;
    }

    addOffsets() {
        const offsetArr = []
        for (let i = 0; i < this.sideNumber; i++) {
            offsetArr[i] = Helper.Math.Random.getRandomArbitrary(-10, 10);
        }
        return offsetArr;
    }

    update(dt) {
        this.move(dt)
        this.wrap();
        console.log()
        
    }

    draw(ctx) {
        ctx.save();
        Draw.canvasMethods.translateOriginToEntity(ctx, this);
        Draw.canvasMethods.rotateCanvasAroundEntity(ctx, this);
        Draw.Geometry.drawShape(ctx, this.points, this.strokeStyle);
        ctx.restore();
        //hitbox
        Draw.Geometry.drawCircle(ctx, "red", 2, this.pos, this.hitboxRadius)
    }

    //Determine the endpoint of a line given an angle, length,
    //and starting point [x, y]
    getVertexPoints() {
        const pArr = [];
        let angleTotal = Math.PI*2;
        for (let i = 0; i < this.sideNumber; i++) {
            let angle = angleTotal * (i/this.sideNumber);
            const r = this.radius + this.offsets[i];
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            const point = new Point2d(x, y)
            pArr.push(point)
        }
        return pArr
    }
}