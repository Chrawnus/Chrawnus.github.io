export class Menu{
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
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
        this.setTextStyling(ctx, 24, this.font);
        this.getHearts();
        ctx.fillText(`${this.hearts} `, this.canvasWidth*0.033, this.canvasHeight*0.09);
    }

    drawScore(ctx) {
        this.setTextStyling(ctx, 24, this.font);
        ctx.fillText(`${this.score} `, this.canvasWidth*0.036, this.canvasHeight*0.20);

    }

    drawPauseMsg(ctx) {
        this.setTextStyling(ctx, 16, this.font);
        ctx.fillText(this.pauseMsg, this.canvasWidth*0.66, this.canvasHeight*0.09);
    }

    drawGameOverMsg(ctx) {
        this.setTextStyling(ctx, 16, this.font);
        const textWidth = ctx.measureText(this.gameOverMsg).width;
        const xPos = (this.canvasWidth - textWidth) / 2;
        ctx.fillText(this.gameOverMsg, xPos, this.canvasHeight*0.5);
    }

    setTextStyling(ctx, fontSize, font) {
        ctx.fillStyle = this.textColor;
        ctx.font = `${fontSize}px ${font}`;
    }
}