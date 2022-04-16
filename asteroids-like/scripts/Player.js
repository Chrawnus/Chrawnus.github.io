import { Geometry } from "./Geometry.js";
import { Update } from "./Update.js";
import { Helper } from "./helperFunctions.js";
import { Projectile } from "./Projectile.js";
import { engine } from "./app.js";
import { canvas } from "./Elements.js";
import { Input } from "./Input.js";
import { Engine } from "./Engine.js";


export class Player extends Geometry{
    constructor(pos, sideNumber, radius) {
        super(pos, sideNumber, radius)
        this.radius = radius;
        this.hitboxRadius = radius*0.50;
        this.speed = 450;
        this.speedScaling = 10;
        this.hasShot = false;
        this.cooldown = 0.4;
        this.cooldownOrig = 0.4;
        this.points = this.getVertexPoints();
        this.rotationAngle = Helper.Movement.getRotationAngle(this);
        this.rotationSpeed = 0;
    }

    update(dt) {
        Update.Physics.Movement.rotateShape(this);
        Helper.Movement.wrap(this, canvas)
        Update.Physics.Movement.moveTowardsTarget(dt, this, Helper.Cursor.mouseC, this.speedScaling);
        this.shootProjectile(dt);
    }
    
    shootProjectile(dt) {
        this.checkCooldown(dt);
        const mouseX = Helper.Cursor.getX();
        const mouseY = Helper.Cursor.getY();
        if (this.hasShot === false && Helper.Cursor.isMouseDown) {
            const angle = Math.atan2(mouseX - this.pos.x, mouseY - this.pos.y);
            Engine.Spawner.spawnProjectile(engine, this.pos, angle);
            this.hasShot = true;
        }
    }

    checkCooldown(dt) {
        if (this.hasShot) {
            if (this.cooldown > 0) {
                this.cooldown -= dt;
            } else {
                this.hasShot = false;
                this.cooldown = this.cooldownOrig;
            }
        }
    }

    checkKeyPress(keyCode) {
        return Input.getKey(keyCode);
    }
}