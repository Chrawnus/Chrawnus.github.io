export class Menu{
    constructor() {
        this.pauseMsg = "Press P to pause the game";
        this.lives;
        this.hearts = "🤍";
        this.score = 0;

    }

    draw(ctx) {
        this.drawUI(ctx) 
    }

    getHearts() {
        this.hearts = "";
        const heart = "🤍";

        for (let i = 0; i < this.lives; i++) {
            this.hearts += heart;
        }
    }
    drawUI(ctx) {
        this.drawLives(ctx);
        this.drawScore(ctx);
        this.drawPauseMsg(ctx);
    }

    drawLives(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "18px serif";
        this.getHearts();
        ctx.fillText(`${this.hearts} `, 25, 35);
    }

    drawScore(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "18px serif";
        ctx.fillText(`${this.score} `, 30, 65);

    }

    drawPauseMsg(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "18px serif";
        ctx.fillText(this.pauseMsg, 580, 45);
    }
}