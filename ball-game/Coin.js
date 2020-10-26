class Coin {
    constructor(rad) {
        this.x = getRandomInt(1, canvasElem.width);
        this.y = getRandomInt(1, canvasElem.height);
        this.rad = rad;
    }

    update() {
        this.collisionDetectionPlayer();
    }

    collisionDetectionPlayer() {
        if (collisionDetection(player.x, this.x, player.y, this.y)) {
            this.x = getRandomInt(1, canvasElem.width);
            this.y = getRandomInt(1, canvasElem.height);
            score += 10;
            scoreElem.textContent = `Score: ${score}`;

            if (player.velocity < player.maxVelocity) {
                player.velocity = player.velocity * 1.05;
                console.log(player.velocity);
            }


            objMovement.Up = -player.velocity;
            objMovement.Down = player.velocity;
            objMovement.Left = -player.velocity;
            objMovement.Right = player.velocity;
        }


    }

    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fillStyle = "yellow";
        ctx.fill();
        ctx.stroke();
    }
}