import { Vector } from "./Vector.js";
import { Point2d } from "./Point2d.js";
import { helper } from "./app.js";


export class Player {
    constructor(x, y, r) {
        this.pos = new Point2d(x, y)
        this.r = r;
        this.internalAngle = 60 * (Math.PI / 180);
        this.externalAngle = 120 * (Math.PI / 180);

        this.velocity = 250;
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.moveTo(helper.mouseC.x, helper.mouseC.y);
        ctx.arc(helper.mouseC.x, helper.mouseC.y, 2, 0, Math.PI*2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        const angle = helper.getRotationAngle(this)
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y)
        
        ctx.rotate(angle)
        
        const p1 = new Point2d(0, 0 + this.r)
        const p2 = new Point2d(p1.x * Math.cos(this.externalAngle) - ( p1.y * Math.sin(this.externalAngle)), p1.x * Math.sin(this.externalAngle) + ( p1.y * Math.cos(this.externalAngle)));
        const p3 = new Point2d(p1.x * Math.cos(this.externalAngle*2) - ( p1.y * Math.sin(this.externalAngle*2)), p1.x * Math.sin(this.externalAngle*2) + ( p1.y * Math.cos(this.externalAngle*2)))
        
        
        
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        

        ctx.fillStyle = "red";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    }

    update(dt) {
        this.moveTowardsCursor(dt);

    }

    moveTowardsCursor(dt) {
        const dx = helper.mouseC.x - this.pos.x;
        const dy = helper.mouseC.y - this.pos.y;

        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(helper.mouseC.x - this.pos.x, helper.mouseC.y - this.pos.y);

        
        this.pos.x += distance * 5 * Math.sin(angle) * dt;
        this.pos.y += distance * 5 * Math.cos(angle) * dt;
    }
}