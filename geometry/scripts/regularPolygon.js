import { Geometry } from "./geometry.js";
import { Point2d } from "./Point2d.js";

export class RegularPolygon extends Geometry {
    constructor(x, y, sideNumber, sideLength, rotationAngle) {
        super(x, y)
        this.sideLength = sideLength; //side length
        this.sideNumber = sideNumber; //number of sides
        this.rotationAngle = rotationAngle; // rotation angle
        this.internalAngle = (this.determineAngle(this.sideNumber)); //internal angle of vertices
        this.externalAngle = 180 - this.internalAngle;
        this.center = this.determineCentroid(this.x, this.y, this.sideNumber, this.sideLength, this.externalAngle);
    }

    //function to determine internalAngle based on number of sides on the polygon;
    determineAngle = (sideNumber) => 180 * (sideNumber - 2) / sideNumber;

    determineCentroid(x, y, sideNumber, sideLength, externalAngle) {
        let originPoint = new Point2d(x, y);
        let pointsArr = this.getPolygonVertexCoords(sideNumber, x, y, sideLength, externalAngle, originPoint)
        let center = new Point2d(0, 0);
        for (let i = 0; i < pointsArr.length - 1; i++) {
            center.x += pointsArr[i].x;
            center.y += pointsArr[i].y;
        }
        center.x = center.x / sideNumber;
        center.y = center.y / sideNumber;

        return center;
    }


    //Determine the endpoint of a line given an angle 
    //and a starting point [x, y]
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


    //Returns a points array of vertex coordinates for constructing the polygon
    getPolygonVertexCoords(sideNumber, x, y, sideLength, externalAngle, originPoint) {
        let pArr = new Array(sideNumber);
        let point = this.getCoordFromAngle(x, y, sideLength, externalAngle);
        pArr[0] = originPoint;
        for (let i = 0; i < sideNumber; i++) {
            const p = new Point2d(point[0], point[1]);
            pArr[i + 1] = p;
            point = this.getCoordFromAngle(point[0], point[1], sideLength, externalAngle * (i + 2));
        }
        return pArr;
    }

    rotatePolygon(PointsArr, rotationAngle, center) {
        let centerInvert = new Point2d(-center.x, -center.y);

        for (let i = 0; i < PointsArr.length; i++) {
            PointsArr[i].translate(centerInvert);//  translate to origin
            PointsArr[i].rotate(rotationAngle);//  rotate
            PointsArr[i].translate(center);// translate back to it's original position
        }
    }

    draw(ctx, dt) {
        let originPoint = new Point2d(this.x, this.y);
        let externalAngle = 180 - this.internalAngle;
        let pointsArr = this.getPolygonVertexCoords(this.sideNumber, this.x, this.y, this.sideLength, externalAngle, originPoint);

        this.rotatePolygon(pointsArr, this.rotationAngle, this.center);

        this.drawPolygon(ctx, pointsArr);
        this.drawCenter(ctx);
    }

    drawCenter(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.center.x, this.center.y);
        ctx.arc(this.center.x, this.center.y, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    drawPolygon(ctx, pointsArr) {
        ctx.beginPath();
        ctx.moveTo(pointsArr[pointsArr.length - 1].x, pointsArr[pointsArr.length - 1].y);
        for (let i = 0; i < pointsArr.length - 1; i++) {
            ctx.lineTo(pointsArr[i].x, pointsArr[i].y);
        }
        ctx.lineTo(pointsArr[0].x, pointsArr[0].y);
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }

    update(dt) {
        this.center = this.determineCentroid(this.x, this.y, this.sideNumber, this.sideLength, (180 - this.internalAngle));
        //this.rotationAngle += 1;
    }

    getRegularPolygonPoints(center, sideNumber, sideLength) {
        let points = [];
        let alpha = 2 * Math.PI / sideNumber;
        for (let i = 0; i < sideNumber; i++) {
            points.push(new Point2d(
                center.x + sideLength * Math.cos(alpha * i),
                center.y + sideLength * Math.sin(alpha * i))
            )
        }
        return points;
    }
}


