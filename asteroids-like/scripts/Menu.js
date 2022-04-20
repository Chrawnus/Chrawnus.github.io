export class Menu{
    constructor() {
        this.pauseMsg = "Press P to pause the game";
        this.lives;
        this.hearts = "🤍";

    }

    draw(ctx) {
        this.drawText(ctx) 
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