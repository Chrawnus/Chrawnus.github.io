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
        this.lives = 3;
    }

    update(dt) {
        Update.Physics.Movement.rotateShape(this, dt);
        Helper.Movement.wrap(this)
        this.handleInputs(dt);
    }

    handleInputs(dt) {
        if (Input.mouseInputObject["2"]) {
            Update.Physics.Movement.moveTowardsTarget(dt, this, Helper.Cursor.mouseC, this.speedScaling);
        }
        if (Input.mouseInputObject[0]) {
            this.shootProjectile();
        }
    }

    shootProjectile() {
        const mousePos = Helper.Cursor.mouseC;
        const angle = Helper.Math.Trig.getAngleBetweenEntities(this, mousePos);
        Engine.Spawner.spawnProjectile(engine, this.pos, angle);
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