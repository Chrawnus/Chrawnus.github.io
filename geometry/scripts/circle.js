import { Point2d } from "./Point2d.js";
export class Circle {
    constructor(x, y, rad, fillStyle, strokeStyle, lineWidth, sides) {
        this.pos = new Point2d(x, y);
        this.rad = rad;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
        this.sides = sides;
        this.points = [];
        this.simplified = () => this.sides === undefined ? false : true;
    }
    determineAngle = (sideNumber) => 180 * (sideNumber - 2) / sideNumber;

    draw(ctx) {
        

        if (this.simplified()) {
            let startPoint = new Point2d(this.pos.x, this.pos.y - this.rad);
            this.centerOrigin(startPoint.x, startPoint.y);
            this.points = this.createSimplifiedShape(startPoint);
            this.centerOrigin(startPoint.x, startPoint.y);



            ctx.moveTo(this.points[0].x, this.points[0].y)
            for (let i = 0; i < this.points.length; i++) {
                ctx.lineTo(this.points[i].x, this.points[i].y)
            }


        } else {
            let startPoint = new Point2d(this.pos.x, this.pos.y - this.rad);
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.arc(startPoint.x, startPoint.y, this.rad, 0, Math.PI * 2, false);
        }
        this.drawShape(ctx);
        //ctx.lineTo(nextPoint.x, nextPoint.y);
    }

    createSimplifiedShape(startPoint) {
        if (this.sides < 3) {
            return 0;
        }
        let pArr = new Array(this.sides);
        let angle = this.determineAngle(this.sides);
        let externalAngle = 180 - angle;
        let angleRad = 360 / this.sides * (Math.PI / 180);
        let chordLength = (this.rad * 2) * Math.sin(angleRad / 2);

        let nextPoint = this.getCoordFromAngle(startPoint.x, startPoint.y, chordLength, externalAngle);
        pArr[0] = new Point2d(startPoint.x, startPoint.y);
        for (let i = 0; i <= this.sides-1; i++) {
            pArr[i+1] = nextPoint;
            nextPoint = this.getCoordFromAngle(nextPoint.x, nextPoint.y, chordLength, externalAngle * (2 + i));
        }

        return pArr;
    }

    drawShape(ctx) {
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.fill();
        ctx.stroke();
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

    centerOrigin(x, y, sideNumber) {
        let center = this.determineCentroid(sideNumber);
        console.log(center)
        this.pos.x = this.pos.x + Math.abs(this.pos.x - center.x);
        this.pos.y = this.pos.y - Math.abs(this.pos.y - center.y);

    }

    determineCentroid(sideNumber) {
        let center = new Point2d(0, 0);
        console.log(this.points)
        if (this.points !== undefined) {
            for (let i = 0; i < this.points.length; i++) {
                center.x += this.points[i].x;
                center.y += this.points[i].y;
            }
        }

        center.x = center.x / sideNumber;
        center.y = center.y / sideNumber;
        return center;
    }
}

