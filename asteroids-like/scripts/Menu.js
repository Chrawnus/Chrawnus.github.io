export class Menu{
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.lives;
        this.hearts = "🤍";
        this.score = 0;
        this.textColor = "white";
        this.font = "PressStart2P";
        this.pauseMsg = "Press P to pause and read instructions";
        this.resumeMsg = "Press P to resume the game";
        this.instructions = ["Right Mouse button to move", "Left mouse button to shoot" , "Aim with mouse"]
        this.gameOverMsg = "You lost! Press Enter to play again!";
        this.highScores;
    }

    // Determine how many hearts to draw on screen.
    getHearts() {
        this.hearts = "";
        const heart = "🤍";

        for (let i = 0; i < this.lives; i++) {
            this.hearts += heart;
        }
    }

    
    // Display the UI on screen.
    drawUI(ctx) {
        this.drawLives(ctx);
        this.drawScore(ctx);
        this.drawPauseMsg(ctx);
    }

    // Display this UI when the player pauses the game. 
    drawPauseUI(ctx) {
        this.drawLives(ctx);
        this.drawScore(ctx);
        this.drawResumeMsg(ctx);
        this.drawInstructions(ctx);
    }

    // Draw pause instructions on screen.
    drawPauseMsg(ctx) {
        this.setTextStyling(ctx, 12, this.font, "center");
        ctx.fillText(`${this.pauseMsg} `, this.canvasWidth * 0.80, this.canvasHeight*0.09);
    }

    // Draw resume instructions on screen.
    drawResumeMsg(ctx) {
        this.setTextStyling(ctx, 12, this.font, "center");
        ctx.fillText(`${this.resumeMsg} `, this.canvasWidth * 0.85, this.canvasHeight * 0.09);
    }

    drawInstructions(ctx) {
        this.setTextStyling(ctx, 16, this.font, "center");
        
        let yPos = this.canvasHeight * 0.25;
        for (let i = 0; i < this.instructions.length; i++) {
            const instruction = this.instructions[i];
            ctx.fillText(instruction, this.canvasWidth*0.5, yPos)
            yPos += this.canvasHeight*0.05;
        }
    }

    // Display Game Over UI on screen.
    drawUIGameOver(ctx) {
        this.drawHighScore(ctx);
        this.drawGameOverMsg(ctx);
    }

    // Draw number of lives on screen represented by hearts.
    drawLives(ctx) {
        this.setTextStyling(ctx, 24, this.font, "left");
        this.getHearts();
        ctx.fillText(`${this.hearts} `, this.canvasWidth*0.033, this.canvasHeight*0.09);
    }

    // Draw score on screen.
    drawScore(ctx) {
        this.setTextStyling(ctx, 24, this.font, "left");
        ctx.fillText(`${this.score} `, this.canvasWidth*0.036, this.canvasHeight*0.20);

    }

    // Draw this when player loses all of their lives. 
    drawGameOverMsg(ctx) {
        this.setTextStyling(ctx, 16, this.font, "center");
        ctx.fillText(this.gameOverMsg, this.canvasWidth*0.5, this.canvasHeight*0.8);
    }


    // Draw High Score on screen
    drawHighScore(ctx) {
        this.setTextStyling(ctx, 16, this.font, "center");
        ctx.fillText(`Local Highscore:`, this.canvasWidth*0.5, this.canvasHeight*0.08)

        // Initial y position of #1 entry in the High Score. 
        let yPos = this.canvasHeight*0.22;

        // Loop through highscore array, and draw each entry 5% canvasHeight px lower than the previous. 
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