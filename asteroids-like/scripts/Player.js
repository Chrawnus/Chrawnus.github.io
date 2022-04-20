import { Geometry } from "./Geometry.js";
import { Helper } from "./HelperFunctions.js";

export class Player extends Geometry {
    constructor(pos, sideNumber, radius) {
        super(pos, sideNumber, radius)
        this.radius = radius;
        this.hitboxRadius = radius * 0.50;
        this.speed = 450;
        this.speedScaling = 10;
        this.rotationAngle = Helper.Movement.getRotationAngle(this);
        this.rotationSpeed = 0;
        this.points = Helper.EntityMethods.getVertexPoints(this);
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