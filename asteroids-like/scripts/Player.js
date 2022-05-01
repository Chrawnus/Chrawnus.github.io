import { Shape } from "./Shape.js";

export class Player extends Shape {
    constructor(x, y, sideNumber, radius) {
        super(x, y, sideNumber, radius)
        this.radius = radius;
        this.hitboxRadius = radius * 0.50;
        this.speed = 50;
        this.speedScaling = 10;
        this.rotationAngle = 0;
        this.rotationSpeed = 0;
        this.points = this.getVertexPoints();
        this.lives = 3;
        this.fireDelay = 0;
        this.fireDelayTime = 0.05;
        this.maxFireDelay = 0.4
        this.minFireDelay = 0.05;
        this.invincibility = 0;
        this.invincibilityTime = 0.5;
    }

    update(dt, engine, canvas) {
        this.handleInputs(engine, dt);
        this.rotateShape(engine); 
        this.wrap(canvas);
        this.reduceDelay(dt);
    }

    onCollision() {
        this.reduceLives();
    }

    reduceLives() {
        if (this.invincibility <= 0 && this.lives > 0) {
            this.lives--;
            this.invincibility = this.invincibilityTime;
        }
    }

    rotateShape(engine) {
        this.rotationAngle = this.getAngleToCursor(engine.input.Cursor.mouseC);
    }

    getAngleToCursor(cursor) {
        const { dx, dy } = this.getDeltas(cursor);
        const angle = Math.atan2(dy, dx);
        return angle;
    }

    handleInputs(engine, dt) {
        if (engine.input.mouseInputObject["2"]) {
            this.moveTowardsCursor(dt, engine.input.Cursor.mouseC);
        }

        if ((engine.input.mouseInputObject["0"] || engine.input.keyInputObject["Space"]) && this.fireDelay === 0) {
            this.fireDelay = this.fireDelayTime;
            this.shootProjectile(engine);
        }
    }

    reduceDelay(dt) {
        if (this.fireDelay > 0) {
            this.fireDelay -= dt;
            if (this.fireDelay < 0) {
                this.fireDelay = 0;
            }
        }

        if (this.invincibility > 0) {
            this.strokeStyle = "red";
            this.invincibility -= dt;
            if (this.invincibility < 0) {
                this.invincibility = 0;
                this.strokeStyle = "white";
            }
        }
    }

    moveTowardsCursor(dt, cursor) {
        const distance = this.getDistanceToEntity(cursor);
        const angle = this.getAngleToCursor(cursor);
        this.move(dt, distance, angle);
    }

    move(dt, distance, angle) {
        this.pos.x += ((this.speed*distance*this.speedScaling) * Math.cos(angle) * dt ** 2);
        this.pos.y += ((this.speed*distance*this.speedScaling) * Math.sin(angle) * dt ** 2);
    }

    shootProjectile(engine) {
        const angle = this.rotationAngle;
        engine.spawner.spawnProjectile(engine, this.pos, angle);
    }

    upgrade() {
        if (this.fireDelayTime <= this.minFireDelay) {
            this.fireDelayTime = this.minFireDelay;
            return;
        }
        // multiply minFireDelay by 2 to reduce the amount needed
        // to get fireDelayTime down to min.
        const reduction = this.fireDelayTime * (this.minFireDelay * 2);
        console.log(reduction)
        this.fireDelayTime -= reduction; 
    }
}