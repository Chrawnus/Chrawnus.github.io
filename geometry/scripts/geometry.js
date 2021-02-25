import { Helper } from "./HelperFunctions.js";
import { Point2d } from "./Point2d.js";
export class Geometry {
    constructor(x, y, points) {
        this.x = x;
        this.y = y;
        this.points = points;
        this.sideLengths = [];
        this.sides;
        this.intersectionP;
        this.lastAngle;
        this.activePoint;
        this.activePoints;
    }

    determineAngle = (sideNumber) => 180 * (sideNumber - 2) / sideNumber;

    draw(ctx) {
        this.drawShape(ctx, this.points)
        this.drawActivePoint(ctx);
        this.drawActivePoints(ctx);
    }

    drawShape(ctx, points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);

        }
        ctx.lineTo(points[0].x, points[0].y);
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

    }

    drawActivePoint(ctx) {
        let point = this.activePoint;
        if (point) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.arc(point.x, point.y, 4, 0, Math.PI*2);
            ctx.fillStyle = "green";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

    }

    drawActivePoints(ctx) {
        let points = this.activePoints;
        if (points) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.arc(point.x, point.y, 4, 0, Math.PI*2);
                ctx.fillStyle = "green";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 0.5;
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    createRandomPolygon(sides = () => Helper.getRandomInt(3, 12), sideLength = () => Helper.getRandomInt(15, 30), angle = () => Helper.getRandomInt(0, 360)) {
        this.sides = sides;
        for (let i = 0; i < sides; i++) {
            this.sideLengths.push(sideLength());
        }
        let angle1;
        let p;
        for (let i = 0; i < this.sides; i++) {

            if (p === undefined) {
                p = new Point2d(this.x, this.y);
            } else {

                angle1 = angle();

                p = this.getCoordFromAngle(p.x, p.y, this.sideLengths[i], angle1 * (2 + i))
                if (i === this.sides - 1) {


                }
                this.points.push(p);
            }
            this.lastAngle = angle1;

        }
    }

    getSelectedPoint(point) {
        this.activePoint = new Point2d(point.x, point.y);
    }


    getCoordFromAngle(x, y, sideLength, externalAngle) {
        const externalAngleRadians = (externalAngle) * (Math.PI / 180);
        let x2 = sideLength * (Math.sin(externalAngleRadians));
        let y2 = Math.sqrt((sideLength) ** 2 - (x2 ** 2));
        let x3;
        let y3;
        if (externalAngle > 90 && externalAngle < 180) {
            x3 = x + x2;
            y3 = y - y2;
            return new Point2d(x3, y3);
        } else if (externalAngle >= 180 && externalAngle < 270) {
            x3 = x + x2;
            y3 = y - y2;
            return new Point2d(x3, y3);
        } else if (externalAngle > 270 && externalAngle < 360) {
            x3 = x + x2
            y3 = y + y2
            return new Point2d(x3, y3);
        } else {
            x3 = x + x2
            y3 = y + y2
            return new Point2d(x3, y3);
        }
    }

    intersects(p1, p2, p3, p4) {
        // Check if none of the lines are of length 0
        if (this.hasLength(p1, p2, p3, p4)) {
            return false
        }
        const denominator = (this.getDenominator(p4, p3, p2, p1))
        // Lines are parallel
        if (denominator === 0) {
            return false
        }
        let ua = this.getNumeratorA(p4, p3, p1) / denominator
        let ub = this.getNumeratorB(p2, p1, p3) / denominator
        // is the intersection along the segments
        if (this.isIntersectionAlongSegment(ua, ub)) {
            return false
        }

        // Return a object with the x and y coordinates of the intersection
        let { x, y } = this.getIntersectionPoint(p1, ua, p2);

        return {x, y};
    }

    getNumeratorB(p2, p1, p3) {
        return ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x));
    }

    getNumeratorA(p4, p3, p1) {
        return ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x));
    }

    getIntersectionPoint(p1, ua, p2) {
        let x = p1.x + ua * (p2.x - p1.x);
        let y = p1.y + ua * (p2.y - p1.y);
        return { x, y };
    }

    isIntersectionAlongSegment(ua, ub) {
        return ua < 0 || ua > 1 || ub < 0 || ub > 1;
    }

    getDenominator(p4, p3, p2, p1) {
        return (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
    }

    hasLength(p1, p2, p3, p4) {
        return (p1.x === p2.x && p1.y === p2.y) || (p3.x === p4.x && p3.y === p4.y);
    }
}
