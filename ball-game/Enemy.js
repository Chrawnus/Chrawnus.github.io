class Enemy {
    constructor(rad) {
        this.x = getRandomInt(1, canvasElem.width);
        this.y = getRandomInt(1, canvasElem.height);
        this.rad = rad;
        this.then = Date.now();
    }

    update() {
        let delta = this.setDelta();
        this.collisionDetectionPlayer(delta);
    }

    collisionDetectionPlayer(delta) {
        if (collisionDetection(player.x, this.x, player.y, this.y)) {
            this.x += (this.x - player.x) * delta;
            this.y += (this.y - player.y) * delta;
            /*             this.x = getRandomInt(1, canvasElem.width);
                        this.y = getRandomInt(1, canvasElem.height); */
        } else {
            this.x -= (this.x - player.x) * delta;
            this.y -= (this.y - player.y) * delta;
        }
    }



    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.stroke();
    }

    setDelta() {
        let now = Date.now();
        let delta = (now - this.then) / 1000; // seconds since last frame
        this.then = now;
        return delta;
    }
}