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
    }

    update(dt, engine, canvas) {
        this.handleInputs(engine, dt);
        this.rotateShape(engine); 
        this.wrap(canvas);

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
            engine.input.rightButtonDelay = engine.input.mouseInputObject["0"] ? 0.02 : engine.input.rightButtonDelay;
        }
        if (engine.input.mouseInputObject["0"] && engine.input.leftButtonDelay === 0) {
            engine.input.leftButtonDelay = 0.3
            this.shootProjectile(engine);
        }

        if(engine.input.leftButtonDelay > 0) {
            engine.input.leftButtonDelay -= dt;
            if (engine.input.leftButtonDelay < 0) {
                engine.input.leftButtonDelay = 0;
            }
        }
    }

    moveTowardsCursor(dt, cursor) {
        const distance = this.getDistanceToEntity(cursor);
        const angle = this.getAngleToCursor(cursor);
        this.move(dt, distance, angle);
    }

    move(dt, distance, angle) {
        this.pos.x += ((this.speed*distance*this.speedScaling) * Math.cos(angle) *dt**2);
        this.pos.y += ((this.speed*distance*this.speedScaling) * Math.sin(angle) *dt**2);
    }

    shootProjectile(engine) {
        const angle = this.rotationAngle;
        engine.spawner.spawnProjectile(engine, this.pos, angle);
    }
}