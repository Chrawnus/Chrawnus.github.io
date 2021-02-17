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
    }

    //function to determine internalAngle based on number of sides on the polygon;
    determineAngle = (sideNumber) => 180 * (sideNumber - 2) / sideNumber;

    determineCentroid(x, y, sideNumber, sideLength, externalAngle) {
        let center = new Point2d(0, 0);

            let originPoint = new Point2d(x, y);
            let points = this.getPolygonVertexCoords(sideNumber, x, y, sideLength, externalAngle, originPoint)
            for (let i = 0; i < points.length; i++) {
                center.x += points[i].x;
                center.y += points[i].y;
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
        for (let i = 0; i < sideNumber-1; i++) {
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
        let x = this.x;
        let y = this.y;
        let center = this.determineCentroid(x, y, this.sideNumber, this.sideLength, (180 - this.internalAngle));
        x = x - Math.abs(x - center.x);
        y = y + Math.abs(y - center.y); 
        
        let externalAngle = 180 - this.internalAngle;
        let originPoint = new Point2d(x, y);
        let points = this.getPolygonVertexCoords(this.sideNumber, x, y, this.sideLength, externalAngle, originPoint);

        center = this.determineCentroid(x, y, this.sideNumber, this.sideLength, (180 - this.internalAngle));
        
        this.rotatePolygon(points, this.rotationAngle, center);
        this.drawPolygon(ctx, points)
        this.drawCenter(ctx, center);
    }

    drawCenter(ctx, center) {
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.arc(center.x, center.y, 5, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();
    }

    drawPolygon(ctx, pointsArr) {
        ctx.beginPath();
        ctx.moveTo(pointsArr[0].x, pointsArr[0].y);
        for (let i = 0; i < pointsArr.length; i++) {
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


