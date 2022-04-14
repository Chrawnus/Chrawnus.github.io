import { Geometry } from "./Geometry.js";
import { Helper } from "./helperFunctions.js";
import { canvas } from "./Elements.js";
import { Update } from "./Update.js";

export class Asteroid extends Geometry {
    constructor(pos, sideNumber, radius, angle) {
        super(pos, sideNumber, radius);
        this.angle = angle;
        this.hitboxRadius = this.radius;
        this.offsets = this.addOffsets();
        this.speed = Helper.Math.Random.getRandomArbitrary(150, 250);
        this.speedScaling = 1;
        this.rotationSpeed = Helper.Math.Random.getRandomArbitrary((Math.PI*2*0.005) * -1, Math.PI*2*0.005);
        this.rotationAngle = 0;
        this.points = this.getVertexPoints();
    }

    update(dt) {
        Update.Physics.Movement.rotateShape(this);
        Helper.Movement.wrap(this, canvas)
        Update.Physics.Movement.move(dt, this, this.speed, this.speedScaling, this.angle); 
    }
}