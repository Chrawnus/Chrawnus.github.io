import { GeomHelper } from "./geomHelpers.js";
import { keyArr } from "./KeyArr.js";
import { LineSegment } from "./lineSegment.js";

export class Geometry {
    constructor(strokeStyle, fillStyle, lineWidth, filled, stroked) {
        this.pos;
        this.points = [];
        this.sides = [];
        this.strokeStyle = strokeStyle;
        this.fillStyle = fillStyle;
        this.lineWidth = lineWidth;
        this.filled = filled;
        this.stroked = stroked;
    }

    addPoint(position) {

        const len = this.points.length;
        if (len === 0) {
            this.pos = position;
            this.points.push(position);
        } else {
            if (len < 2) {
                this.sides.push(new LineSegment(this.points[len - 1], position));
                this.points.push(position);
                this.pos = GeomHelper.getLineSegmentMiddle(this.points[0], this.points[1]);
            }

            if (len >= 2 && keyArr.includes('Shift')) {

                this.sides.push(new LineSegment(this.points[len - 1], position));
                this.sides.push(new LineSegment(position, this.points[0]));
                this.points.push(position);
            } else if (!(keyArr.includes('Shift'))) {
                this.sides.push(new LineSegment(this.points[len - 1], position));
                this.points.push(position);



            }
        }
    }

    removePoint(point) {
        
        const len = this.points.length;
        const index = this.getIndex(point);

        if (len === 1) {
            this.points.splice(index, 1);
            this.pos = undefined;
        } else if (len === 2) {
            this.points.splice(index, 1);
            this.pos = this.points[0];
            this.sides.splice(0, 1);
        }
    }

    getIndex(point) {
        for (let i = 0; i < this.points.length; i++) {
            const pointInPoints = this.points[i];
            if (pointInPoints.x === point.x && pointInPoints.y === point.y) {
                return i;
            }
        }
        const index = getIndex(point);
        return index;
    }


    draw(ctx) {
        const len = this.points.length;
        this.drawOrigin(ctx);
        if (len === 1) {
            this.drawPoint(ctx);
        } else if (len === 2) {
            this.drawLine(ctx);
        } else if (len > 2) {
            this.drawShape(ctx);

        }
    }

    drawPoint(ctx) {
        if (this.pos !== undefined) {
            const x = this.points[0].x;
            const y = this.points[0].y;
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2, false);
            ctx.fillStyle = this.fillStyle;
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

    drawLine(ctx) {
        const len = this.sides.length;
        for (let i = 0; i < len; i++) {
            const side = this.sides[i];
            side.draw(ctx, this.strokeStyle, this.lineWidth);
        }
    }

    drawShape(ctx) {
        const len = this.sides.length;
        for (let i = 0; i < len; i++) {
            const side = this.sides[i];
            side.draw(ctx, this.strokeStyle, this.lineWidth);
        }
    }

    drawOrigin(ctx) {
        if (this.pos !== undefined) {
            const x = this.pos.x;
            const y = this.pos.y;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2, false);
            ctx.fillStyle = "green";
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

    fillOrStroke() {
        if (this.stroked) {

            if (this.filled) {

            }
        } else {
            if (this.filled) {

            } else {
                this.stroked = true;
            }
        }
    }
}