import { Shape } from "./Shape.js";
import { Helper } from "./HelperFunctions.js";

export class Asteroid extends Shape {
    constructor(x, y, sideNumber, radius, angle) {
        super(x, y, sideNumber, radius);
        this.angle = angle;
        this.hitboxRadius = this.radius;
        this.offsets = this.addOffsets();
        this.speed = Helper.Math.Random.getRandomInt(150, 200);
        this.speedScaling = 1;
        this.rotationSpeed = Helper.Math.Random.getRandomArbitrary((Math.PI*2) * -1, Math.PI*2);
        this.rotationAngle = 0;
        this.points = this.getVertexPoints();
    }

    onCollision(entities) {
        this.killEntity(entities);
    }
}