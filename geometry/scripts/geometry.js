import { Helper } from "./helperFunctions.js";
import { Point2d } from "./Point2d.js";

export class Geometry {
    constructor(x, y, points) {
        this.x = x;
        this.y = y;
        this.points = points;
        this.sideLength;
        this.externalAngle;
        this.sides;
        this.centroid;
        this.createRandomRegularPolygon(Helper.getRandomInt(3, 12));
    }

    determineAngle = (sideNumber) => 180 * (sideNumber - 2) / sideNumber;

    drawShape(ctx, points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[0].x, points[0].y);
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    createRandomRegularPolygon(sides, sideLength = Helper.getRandomInt(15, 30)) {
        this.sides = sides;
        this.sideLength = sideLength;

        this.externalAngle = (180 - this.determineAngle(this.sides));
        this.points = this.getPolygonVertexCoords(this.sides, this.x, this.y, this.sideLength, this.externalAngle)
    }

    getPolygonVertexCoords(sideNumber, x, y, sideLength, externalAngle) {
        let originPoint = new Point2d(x, y);
        let pArr = [];

        let point = this.getCoordFromAngle(x, y, sideLength, externalAngle);

        pArr[0] = originPoint;
        for (let i = 0; i < sideNumber - 1; i++) {
            const p = new Point2d(point[0], point[1]);
            pArr.push(p);
            
            point = this.getCoordFromAngle(point[0], point[1], sideLength, externalAngle * (i + 2));
        }
        return pArr;
    }

    getCoordFromAngle(x, y, sideLength, externalAngle) {
        const externalAngleRadians = (externalAngle) * (Math.PI / 180);
        let x2 = sideLength * (Math.sin(externalAngleRadians));
        let y2 = Math.sqrt((sideLength) ** 2 - (x2 ** 2));
        if (externalAngle > 90 && externalAngle < 180) {
            return [x + x2, y - y2];
        } else if (externalAngle >= 180 && externalAngle < 270) {
            return [x + x2, y - y2];
        } else if (externalAngle > 270 && externalAngle < 360) {
            return [x + x2, y + y2];
        } else {
            return [x + x2, y + y2];
        }
    }
}