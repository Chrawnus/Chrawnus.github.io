class Player {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.velocity = 250;
        this.maxVelocity = this.velocity*2;
        this.then = Date.now();
    }

    update() {

        let delta = this.setDelta();
        this.collisionDetectionEnemy();
        this.movementHandler(delta);
    }

    collisionDetectionEnemy() {
        if (collisionDetection(this.x, enemy.x, this.y, enemy.y)) {
            this.x = canvasElem.width / 2;
            this.y = canvasElem.height / 2;
        }
    }



    draw(ctx) {
        ctx.beginPath(this.x, this.y);
        ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2, true);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.stroke();
    }

    
    movementHandler(delta) {
        if (keyArr.includes("ArrowUp") && (this.y > this.rad)) {
            this.y += objMovement.Up * delta;
        }
        if (keyArr.includes("ArrowDown") && (this.y < (canvasElem.height - this.rad))) {
            this.y += objMovement.Down * delta;
        }
        if (keyArr.includes("ArrowLeft") && (this.x > this.rad)) {
            this.x += objMovement.Left * delta;
        }
        if (keyArr.includes("ArrowRight") && (this.x < (canvasElem.width - this.rad))) {
            this.x += objMovement.Right * delta;
        }
    }

    setDelta() {
        let now = Date.now();
        let delta = (now - this.then) / 1000; // seconds since last frame
        this.then = now;
        return delta;
    }
}