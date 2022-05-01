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
        this.fireDelayTime = 0.4;
        this.maxFireDelay = 0.4
        this.minFireDelay = 0.05;
        this.currInvincibilityT = 0;
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
        // if player entity is not currently in invincibility mode
        // remove a life, and put player in invincibility mode. 
        if (this.currInvincibilityT <= 0 && this.lives > 0) {
            this.lives--;
            this.currInvincibilityT = this.invincibilityTime;
        }
    }

    // rotate player in direction of cursor position
    rotateShape(engine) {
        this.rotationAngle = this.getAngleToCursor(engine.input.Cursor.mouseC);
    }


    /*
    get the angle from the direction the player is pointing,
    to the current cursor position. 
    */
    getAngleToCursor(cursor) {
        const { dx, dy } = this.getDeltas(cursor);
        const angle = Math.atan2(dy, dx);
        return angle;
    }

    /*
    handle player input behavior.
    */
    handleInputs(engine, dt) {

        // if right mouse button is pressed, move player entity
        // towards cursor position.
        if (engine.input.mouseInputObject["2"]) {
            this.moveTowardsCursor(dt, engine.input.Cursor.mouseC);
        }

        // if left mouse button is pressed, and there is no remaining delay
        // fire projectile in the direction the player entity is facing. 
        if ((engine.input.mouseInputObject["0"]) && this.fireDelay === 0) {
            this.fireDelay = this.fireDelayTime;
            this.shootProjectile(engine);
        }
    }

    /* 
    function that handles reducing 
    different types of delay and cooldowns
    */ 
    reduceDelay(dt) {
        this.reduceFireDelay(dt);
        this.reduceInvincibilityTime(dt);
    }

    /*
    reduce current invincibility time 
    if it is above 0, and change color of 
    player entity to red or white, depending 
    on whether player is currently in invincibility
    state or not. 
    */
    reduceInvincibilityTime(dt) {
        if (this.currInvincibilityT > 0) {
            this.strokeStyle = "red";
            this.currInvincibilityT -= dt;
            if (this.currInvincibilityT < 0) {
                this.currInvincibilityT = 0;
                this.strokeStyle = "white";
            }
        }
    }

    // gradually reduce fireDelay to 0
    // so that the player can eventually 
    // shoot a new projectile. 
    reduceFireDelay(dt) {
        if (this.fireDelay > 0) {
            this.fireDelay -= dt;
            if (this.fireDelay < 0) {
                this.fireDelay = 0;
            }
        }
    }

    /*
    function that handles moving the player
    closer to the cursor.
    */
    moveTowardsCursor(dt, cursor) {
        const distance = this.getDistanceToEntity(cursor);
        const angle = this.getAngleToCursor(cursor);
        this.move(dt, distance, angle);
    }

    /*
    moves the player entity in the direction the [angle], 
    scaled with player speed and speedScaling, as well as the distance
    to the cursor. The farther away the mouse cursor is from the player,
    the quicker the player moves towards the cursor.
    */
    move(dt, distance, angle) {
        this.pos.x += ((this.speed*distance*this.speedScaling) * Math.cos(angle) * dt ** 2);
        this.pos.y += ((this.speed*distance*this.speedScaling) * Math.sin(angle) * dt ** 2);
    }

    // spawns a projectile at the position of the player entity,
    // moving in the direction the player is pointing.
    shootProjectile(engine) {
        const angle = this.rotationAngle;
        engine.spawner.spawnProjectile(engine, this.pos, angle);
    }

    // Upgrade rate of fire whenever 
    // the screen is successfully cleared.
    upgrade() {
        if (this.fireDelayTime <= this.minFireDelay) {
            this.fireDelayTime = this.minFireDelay;
            return;
        }
        // multiply minFireDelay by 2 to reduce the amount needed
        // to get fireDelayTime down to min.
        const reduction = this.fireDelayTime * (this.minFireDelay * 2);
        this.fireDelayTime -= reduction; 
    }
}