import { Helper } from "./HelperFunctions.js";
import { Point2d } from "./Point2d.js";

export class Shape {
    constructor(x, y, sideNumber, radius) {
        this.angle = 0;
        this.pos = new Point2d(x, y);
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

    getVertexPoints() {
        const pArr = [];
        let angleTotal = Math.PI * 2;
        for (let i = 0; i < this.sideNumber; i++) {
            let angle = angleTotal * (i / this.sideNumber);
            const r = this.radius + this.offsets[i];
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            const point = new Point2d(x, y)
            pArr.push(point)
        }
        return pArr
    }
}