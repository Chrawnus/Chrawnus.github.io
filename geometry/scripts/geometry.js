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
        this.createRandomPolygon(Helper.getRandomInt(3, 12));
    }

    determineAngle = (sideNumber) => 180 * (sideNumber - 2) / sideNumber;

    drawShape(ctx, points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
            ctx.stroke();
        }
        ctx.lineTo(points[0].x, points[0].y);
        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    createRandomPolygon(sides = () => Helper.getRandomInt(3, 12), sideLength = () => Helper.getRandomInt(15, 30), angle = () => Helper.getRandomInt(0, 360)) {
        this.sides = sides;
        for (let i = 0; i < sides; i++) {
            this.sideLengths.push(sideLength());
        }

        let p;
        for (let i = 0; i < this.sides; i++) {
            if (p === undefined) {
                p = new Point2d(this.x, this.y);
            } else {
                p = this.getCoordFromAngle(p.x, p.y, this.sideLengths[i], angle() * (2 + i))
                if (this.points.length > 1) {
                    for (let i = 0; i < this.points.length - 1; i++) {
                        let sharePoints = this.shareAnyPoint(p, this.points[this.points.length - 1], this.points[i], this.points[i + 1])
                        if (!sharePoints) {
                            let intersects = this.intersects(p, this.points[this.points.length - 1], this.points[i], this.points[i + 1])
                            if (intersects) {
                                console.log("!")
                                p = this.getCoordFromAngle(p.x, p.y, this.sideLengths[i], angle() * (2 + i));
                                intersects = this.intersects(p, this.points[this.points.length - 1], this.points[i], this.points[i + 1])
                            }
                        }
                    }
                }
            }
            this.points.push(p);
        }
    }


    getPolygonVertexCoords(sideNumber, x, y, sideLengths, externalAngle) {
        let originPoint = new Point2d(x, y);
        let pA = [];
        let point = this.getCoordFromAngle(x, y, sideLengths[0], externalAngle);

        pA[0] = originPoint;
        for (let i = 0; i < sideNumber - 1; i++) {

            point = this.getCoordFromAngle(point[0], point[1], sideLengths[i + 1], externalAngle * (i + 2));
            externalAngle = Helper.getRandomInt(0, 360);
            let p = new Point2d(point[0], point[1]);
            if (i > 1) {
                for (let j = 0; j < pA.length - 1; j++) {

                    let sharePoint = this.shareAnyPoint(p, pA[pA.length - 1], pA[j], pA[j + 1]);
                    if (!sharePoint) {
                        let intersects = this.intersects(p, pA[pA.length - 1], pA[j], pA[j + 1]);
                        if (intersects) {
                            console.log("!")
                            externalAngle = Helper.getRandomInt(0, 361);
                            point = this.getCoordFromAngle(point[0], point[1], sideLengths[i + 1], externalAngle * (i + 2));
                            p = new Point2d(point[0], point[1]);
                            intersects = this.intersects(p, pA[pA.length - 1], pA[j], pA[j + 1]);
                        }
                    }
                }
            }
            pA.push(p);


        }
        console.log(sideNumber)
        console.log(pA.length)
        return pA;
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
        let a1, a2, b1, b2, c1, c2;
        let r1, r2, r3, r4;
        let denom, offset, num;

        // Compute a1, b1, c1, where line joining points 1 and 2
        // is "a1 x + b1 y + c1 = 0".
        a1 = p2.y - p1.y;
        b1 = p1.x - p2.x;
        c1 = (p2.x * p1.y) - (p1.x * p2.y);

        // Compute r3 and r4.
        r3 = ((a1 * p3.x) + (b1 * p3.y) + c1);
        r4 = ((a1 * p4.x) + (b1 * p4.y) + c1);

        // Check signs of r3 and r4. If both point 3 and point 4 lie on
        // same side of line 1, the line segments do not intersect.
        if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)) {
            return 0; //return that they do not intersect
        }

        // Compute a2, b2, c2
        a2 = p4.y - p3.y;
        b2 = p3.x - p4.x;
        c2 = (p4.x * p3.y) - (p3.x * p4.y);

        // Compute r1 and r2
        r1 = (a2 * p1.x) + (b2 * p1.y) + c2;
        r2 = (a2 * p2.x) + (b2 * p2.y) + c2;

        // Check signs of r1 and r2. If both point 1 and point 2 lie
        // on same side of second line segment, the line segments do
        // not intersect.
        if ((r1 !== 0) && (r2 !== 0) && (sameSign(r1, r2))) {
            return 0; //return that they do not intersect
        }

        //Line segments intersect: compute intersection point.
        denom = (a1 * b2) - (a2 * b1);
        //collinear  

        if (denom === 0) {
            const xBetween = (p1.x >= p3.x && p1.x <= p4.x || x2 >= p3.x && x2 <= p4.x || p3.x <= p1.x && p3.x >= x2);
            const yBetween = (p1.y >= p3.y && p1.y <= p4.y || p2.y >= p3.y && p2.y <= p4.y || p3.y <= p1.y && p3.y >= p2.y);
            if (xBetween && yBetween) {
                return 1;
            }
            return 0;
        }

        if (denom === 0) {
            return 1; //collinear
        }
        // lines_intersect
        return 1; //lines intersect, return true
    }

    shareAnyPoint(A, B, C, D) {
        if (this.isPointOnTheLine(A, B, C)) {
            return true;
        }
        else if (this.isPointOnTheLine(A, B, D)) {
            return true;
        }
        else if (this.isPointOnTheLine(C, D, A)) {
            return true;
        }
        else if (this.isPointOnTheLine(C, D, B)) {
            return true;
        }
        else {
            return false;
        }
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


/* turn(p1, p2, p3) {
    const [a, b, c, d, e, f] = [p1.x, p1.y, p2.x, p2.y, p3.x, p3.y];
    const A = (f - b) * (c - a);
    const B = (d - b) * (e - a);
    return (A > B + Number.EPSILON) ? 1 : (A + Number.EPSILON < B) ? -1 : 0;
}

intersects(p1, p2, p3, p4) {
    return ((this.turn(p1, p3, p4) != this.turn(p2, p3, p4)) && (this.turn(p1, p2, p3) != this.turn(p1, p2, p4)));
} */

/*     intersects(x1, y1, x2, y2, x3, y3, x4, y4) {
        let determinant, gamma, lambda;
        determinant = (x2 - x1) * (y4 - y3) - (x4 - x3) * (y2 - y1);
        if (determinant === 0) {
            return false;
        } else {
            lambda = ((y4 - y3) * (x4 - x1) + (x3 - x4) * (y4 - y1)) / determinant;
            gamma = ((y1 - y2) * (x4 - x1) + (x2 - x1) * (y4 - y1)) / determinant;
            return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
        }
    } */

