import { Shape } from "./Shape.js";

export class Asteroid extends Shape {
    constructor(x, y, sideNumber, radius, angle, speed, rotationSpeed) {
        super(x, y, sideNumber, radius);
        this.angle = angle;
        this.hitboxRadius = this.radius;
        this.offsets = this.addOffsets();
        this.speed = speed;
        this.speedScaling = 1;
        this.rotationSpeed = rotationSpeed;
        this.rotationAngle = 0;
        this.points = this.getVertexPoints();
    }

    onCollision(entities, engine) {
        engine.spawner.spawnAsteroidsFromAsteroid(engine, this)
        this.killEntity(entities);
    }
}