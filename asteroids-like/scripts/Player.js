import { Geometry } from "./Geometry.js";

export class Player extends Geometry {
    constructor(x, y, sideNumber, radius) {
        super(x, y, sideNumber, radius)
        this.radius = radius;
        this.hitboxRadius = radius * 0.50;
        this.speed = 450;
        this.speedScaling = 10;
        this.rotationAngle = 0;
        this.rotationSpeed = 0;
        this.points = this.getVertexPoints();
        this.lives = 3;
    }

    onCollision() {
        this.reduceLives();
    }

    reduceLives() {
        if (this.lives > 0) {
            this.lives--;
        }
        if (this.lives < 0) {
            this.lives = 0;
        }
    }
}