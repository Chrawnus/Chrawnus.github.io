import { Helper } from "./helperFunctions.js";
import { Point2d } from "./Point2d.js";
export class Geometry {
    constructor(x, y, points) {
        this.x = x;
        this.y = y;
        this.points = points;
        this.sideLengths = [];
        //this.externalAngles = [];
        this.sides;
        this.centroid;
        
        this.test = true;
        this.intersectionP;
        this.lastAngle;
    }

    determineAngle = (sideNumber) => 180 * (sideNumber - 2) / sideNumber;

    drawShape(dt, ctx, points) {
        let start = this.points[0];
        let end = this.points[this.points.length - 1];
        let len = this.points.length;
        let angle1 = this.lastAngle;
        for (let i = 1; i < len - 2; i++) {
            let intersects = this.intersects(start, end, this.points[i], this.points[i + 1]);
            while (intersects) {
                console.log(intersects)
                console.log("!")
                angle1 -= 1;
                if (angle1 > 360) {
                    angle1 = angle1 % 360;
                } else if (angle1 < 0) {
                    angle1 = 360 + angle1;
                }
                console.log(angle1)
                this.points[len - 1] = this.getCoordFromAngle(start.x, start.y, this.sideLengths[this.sideLengths.length - 1], angle1)
                end = this.points[len - 1];
                intersects = this.intersects(start, end, this.points[i], this.points[i + 1]);
            }

        }
        ctx.beginPath();
        while (this.test) {

            this.test = false;
        }

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

    drawIntersectionPoints(ctx, iP) {
        ctx.beginPath();

        for (let i = 0; i < iP.length; i++) {
            ctx.moveTo(iP[i].x, iP[i].y)
            ctx.arc(iP[i].x, iP[i].y, 4, 0, Math.PI * 2, false)
        }
        ctx.fillStyle = "green";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.05;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
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
        console.log(this.lastAngle);
        let intersectionP = [];
        this.createIntersectionPoints(intersectionP);
        this.intersectionP = intersectionP;

    }

    createIntersectionPoints(intersectionP) {
        /*         for (let i = 0; i < this.points.length-2; i++) {
        
          
        
                    let p1 = this.points[i]
        
                    for (let j = i; j < this.points.length-1; j++) {
        
                        let p2 = this.points[j]
        
                        let intersP = this.intersects(p1, this.points[i+1], p2, this.points[j+1]);
                        intersectionP.push(intersP)
                    }
        
                } */
        intersectionP.push(this.points[0])
        intersectionP.push(this.points[this.points.length - 1])
    }
    // [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10]
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
        if ((p1.x === p2.x && p1.y === p2.y) || (p3.x === p4.x && p3.y === p4.y)) {
            return false
        }

        const denominator = ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y))

        // Lines are parallel
        if (denominator === 0) {
            return false
        }

        let ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator
        let ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator

        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            return false
        }

        // Return a object with the x and y coordinates of the intersection
        let x = p1.x + ua * (p2.x - p1.x)
        let y = p1.y + ua * (p2.y - p1.y)


        return true;
    }

    isPointOnSegment(p1, p2, x, y) {
        return Math.min(p1.x, p2.x) <= x && Math.max(p1.x, p2.x) >= x && Math.min(p1.y, p2.y) <= y && Math.max(p1.y, p2.y) >= y;
    }

    isPointOnTheLine(A, B, P) {
        const m = (B.y - A.y) / (B.x - A.x);

        //handle special case where the line is vertical
        if (!(isFinite(m))) {
            if (A.x == P.x) {
                return true;
            }
            else {
                return false;
            }
        }
        if ((P.y - A.y) == m * (P.x - A.x)) {
            return true;
        }
        else {
            return false;
        }
    }
}

function sameSign(a, b) {
    return Math.sign(a) == Math.sign(b);
}


