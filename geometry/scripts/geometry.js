import { Point2d } from "./Point2d.js";

export class Geometry {
    constructor(x, y, points) {
        this.x = x;
        this.y = y;
        this.points = points;
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
        ctx.lineWidth = 2;
        ctx.fill();
        ctx.stroke();
    }
}