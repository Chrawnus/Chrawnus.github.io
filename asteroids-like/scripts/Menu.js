export class Menu{
    constructor() {
        this.pauseMsg = "Press P to pause the game";
        this.lives;
        this.hearts = "🤍";
        this.score = 0;
        this.textColor = "white";
        this.font = "PressStart2P"
        this.gameOverMsg = "You lost! \nPress Enter to play again!"
        this.highScore = {

        }
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

    drawUIGameOver(ctx) {
        this.drawScore(ctx);
        this.drawGameOverMsg(ctx);
    }

    drawLives(ctx) {
        this.setTextStyling(ctx, 16, this.font);
        this.getHearts();
        ctx.fillText(`${this.hearts} `, 25, 35);
    }

    drawScore(ctx) {
        this.setTextStyling(ctx, 16, this.font);
        ctx.fillText(`${this.score} `, 30, 65);

    }

    drawPauseMsg(ctx) {
        this.setTextStyling(ctx, 8, this.font);
        ctx.fillText(this.pauseMsg, 580, 45);
    }

    drawGameOverMsg(ctx) {
        this.setTextStyling(ctx, 16, this.font);
        ctx.fillText(this.gameOverMsg, 104, 300);
    }

    setTextStyling(ctx, fontSize, font) {
        ctx.fillStyle = this.textColor;
        ctx.font = `${fontSize}px ${font}`;
    }
}