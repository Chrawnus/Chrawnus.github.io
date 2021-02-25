import { Point2d } from "./Point2d.js";
export class Circle {
    constructor(x, y, rad, fillStyle, strokeStyle, lineWidth) {
        this.pos = new Point2d(x, y);
        this.rad = rad;
        this.fillStyle = fillStyle;
        this.strokeStyle = strokeStyle;
        this.lineWidth = lineWidth;
    }

    draw(ctx) {
        let x = this.pos.x;
        let y = this.pos.y;
        ctx.beginPath();
        ctx.arc(x, y, this.rad, 0, Math.PI * 2, false);
        ctx.fillStyle = this.fillStyle;
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
    }



      
}

