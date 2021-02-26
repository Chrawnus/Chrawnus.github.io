import { Point2d } from "./Point2d.js";

export class LineSegment {
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    draw(ctx, strokeStyle, lineWidth) {

        ctx.beginPath();
        ctx.moveTo(this.startPoint.x, this.startPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke(); 

    }
}