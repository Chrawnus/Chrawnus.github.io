import { CanvasClass } from "./Canvas.js";
import { Draw } from "./Draw.js";


export class Menu{
    constructor() {
        this.canvas = CanvasClass.menu;
        this.ctx = this.canvas.getContext("2d");
        this.pauseMsg = "Press P to pause the game";
        this.lives;
        this.hearts = "🤍";

    }

    draw() {
        Draw.canvasMethods.clearCanvas(this.canvas, this.ctx, "transparent")
        this.drawText(this.ctx)
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
        
    }

    getHearts() {
        this.hearts = "";
        const heart = "🤍";

        for (let i = 0; i < this.lives; i++) {
            this.hearts += heart;
        }
    }
    drawText(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "18px serif"
        ctx.fillText(this.pauseMsg, 580, 45)

        this.getHearts();
        ctx.fillText(`${this.hearts} `, 30, 45)
    }
}