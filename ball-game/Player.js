class Player {
    constructor(x, y, rad) {
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.velocity = Math.hypot(canvasElem.height, canvasElem.width) * 0.004;
        this.maxVelocity = this.velocity*2;
    }

    update() {
        this.collisionDetectionEnemy();
        this.movementHandler();
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

    
    movementHandler() {
        if (keyArr.includes("ArrowUp") && (this.y > this.rad)) {
            this.y += objMovement.Up;
        }
        if (keyArr.includes("ArrowDown") && (this.y < (canvasElem.height - this.rad))) {
            this.y += objMovement.Down;
        }
        if (keyArr.includes("ArrowLeft") && (this.x > this.rad)) {
            this.x += objMovement.Left;
        }
        if (keyArr.includes("ArrowRight") && (this.x < (canvasElem.width - this.rad))) {
            this.x += objMovement.Right;
        }
    }
}