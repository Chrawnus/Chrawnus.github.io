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
        this.highScores;
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
        this.drawHighScore(ctx);
        this.drawGameOverMsg(ctx);
    }

    drawLives(ctx) {
        this.setTextStyling(ctx, 24, this.font, "left");
        this.getHearts();
        ctx.fillText(`${this.hearts} `, this.canvasWidth*0.033, this.canvasHeight*0.09);
    }

    drawScore(ctx) {
        this.setTextStyling(ctx, 24, this.font, "left");
        ctx.fillText(`${this.score} `, this.canvasWidth*0.036, this.canvasHeight*0.20);

    }

    drawPauseMsg(ctx) {
        this.setTextStyling(ctx, 16, this.font, "center");
        ctx.fillText(this.pauseMsg, this.canvasWidth*0.5, this.canvasHeight*0.09);
    }

    drawGameOverMsg(ctx) {
        this.setTextStyling(ctx, 16, this.font, "center");
        ctx.fillText(this.gameOverMsg, this.canvasWidth*0.5, this.canvasHeight*0.8);
    }

    drawHighScore(ctx) {
        this.setTextStyling(ctx, 16, this.font, "center");
        ctx.fillText(`local highscores:`, this.canvasWidth*0.5, this.canvasHeight*0.08)
        let yPos = this.canvasHeight*0.22;
        for (let i = 0; i < this.highScores.length; i++) {
            const entry = this.highScores[i];
            ctx.fillText(`${entry.playerName}: ${entry.score}`, this.canvasWidth*0.5, yPos)
            yPos += this.canvasHeight*0.05;
            
        }
        
    }

    setTextStyling(ctx, fontSize, font, align) {
        ctx.textAlign = align;
        ctx.fillStyle = this.textColor;
        ctx.font = `${fontSize}px ${font}`;
    }
}