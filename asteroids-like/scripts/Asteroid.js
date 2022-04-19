import { Geometry } from "./Geometry.js";
import { Helper } from "./helperFunctions.js";
import { Update } from "./Update.js";

export class Asteroid extends Geometry {
    constructor(pos, sideNumber, radius, angle) {
        super(pos, sideNumber, radius);
        this.angle = angle;
        this.hitboxRadius = this.radius;
        this.offsets = this.addOffsets();
        this.speed = Helper.Math.Random.getRandomInt(150, 250);
        this.speedScaling = 1;
        this.rotationSpeed = Helper.Math.Random.getRandomArbitrary((Math.PI*2) * -1, Math.PI*2);
        this.rotationAngle = 0;
        this.points = Helper.EntityMethods.getVertexPoints(this);
    }

    update(dt) {
        Update.Physics.Movement.rotateShape(this, dt);
        Helper.Movement.wrap(this)
        Update.Physics.Movement.move(dt, this, this.speed, this.speedScaling, this.angle); 
    }
}