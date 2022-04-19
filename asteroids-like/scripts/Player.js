import { Engine } from "./Engine.js";
import { engine } from "./app.js";
import { Geometry } from "./Geometry.js";
import { Helper } from "./HelperFunctions.js";
import { Input } from "./Input.js";
import { Update } from "./Update.js";

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
    }

    update(dt) {
        Update.Physics.Movement.rotateShape(this, dt);
        Helper.Movement.wrap(this)
        if (Input.getButton(2)) {
            Update.Physics.Movement.moveTowardsTarget(dt, this, Helper.Cursor.mouseC, this.speedScaling);
        }
        if (Input.mouseBtnReleased === 0) {
           this.shootProjectile();
           Input.mouseBtnReleased = undefined;
        }
    }

    shootProjectile() {
        const mousePos = Helper.Cursor.mouseC;
        const angle = Helper.Math.Trig.getAngleBetweenEntities(this, mousePos);
        Engine.Spawner.spawnProjectile(engine, this.pos, angle);
    }
}