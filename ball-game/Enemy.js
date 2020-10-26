class Enemy {
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
            this.x += (this.x - player.x) * 0.08;
            this.y += (this.y - player.y) * 0.08;
            /*             this.x = getRandomInt(1, canvasElem.width);
                        this.y = getRandomInt(1, canvasElem.height); */
        } else {
            this.x -= (this.x - player.x) * 0.08;
            this.y -= (this.y - player.y) * 0.08;
        }
    }



    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }
}