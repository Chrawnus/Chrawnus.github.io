import { Geometry } from "./Geometry.js";
import { Update } from "./Update.js";
import { Helper } from "./helperFunctions.js";
import { engine } from "./app.js";
import { canvas } from "./Elements.js";
import { Input } from "./Input.js";
import { Engine } from "./Engine.js";


export class Player extends Geometry {
    constructor(pos, sideNumber, radius) {
        super(pos, sideNumber, radius)
        this.radius = radius;
        this.hitboxRadius = radius * 0.50;
        this.speed = 450;
        this.speedScaling = 10;
        this.points = this.getVertexPoints();
        this.rotationAngle = Helper.Movement.getRotationAngle(this);
        this.rotationSpeed = 0;
    }

    update(dt) {

        Update.Physics.Movement.rotateShape(this);
        Helper.Movement.wrap(this, canvas)
        if (Input.getButton(2)) {
            Update.Physics.Movement.moveTowardsTarget(dt, this, Helper.Cursor.mouseC, this.speedScaling);
        }
        if (Input.mouseBtnReleased === 0) {
           this.shootProjectile(); 
           Input.mouseBtnReleased = undefined;
        }
    }

    shootProjectile() {
        const mouseX = Helper.Cursor.getX();
        const mouseY = Helper.Cursor.getY();

        const angle = Math.atan2(mouseY - this.pos.y, mouseX - this.pos.x);
        Engine.Spawner.spawnProjectile(engine, this.pos, angle);

    }
}