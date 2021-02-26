import { GeomHelper } from "./geomHelpers.js";

export class Geometry {
    constructor(strokeStyle, fillStyle, lineWidth, filled, stroked) {
        this.pos;
        this.points = [];
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
                this.points.push(position);
                this.pos = GeomHelper.getLineSegmentMiddle(this.points[0], this.points[1]);
            }
        }
    }

    removePoint() {
        const len = this.points.length;
        if (len === 1) {
            this.points.splice(0, 1);
            this.pos = undefined;
        }
    }

    draw(ctx) {
        const len = this.points.length;
        if (len === 1) {
            this.drawPoint(ctx);
        } else if (len === 2) {
            this.drawLine(ctx);
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
        const len = this.points.length;
        ctx.beginPath();
        for (let i = 0; i < len; i++) {
            const point = this.points[i];
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

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