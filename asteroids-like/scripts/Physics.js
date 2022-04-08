import { helper } from "./app.js";
import { Vector } from "./Vector.js";

export class Physics {
    constructor(enableGravity, gLength, gAngle, enableFriction, f) {
        this.prevTime;
        this.accumulator = 0;
        this.enableGravity = enableGravity;
        this.gVector = new Vector();
        this.gVector.setLength(gLength);
        this.gVector.setAngle(gAngle);
        this.enableFriction = enableFriction;
        this.f = f;

        this.entities = [];
    }

    update(now) {
        let dt = this.getDelta(now);
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];
            entity.update(dt)
        }
        this.physics(dt)
    }
    
    physics(dt) {
        this.getPhysicsDelta(dt);
    }


    getPhysicsDelta(dt) {
        let pdt = 0.01;
        this.accumulator += dt;
        
        while (this.accumulator >= pdt) {
            this.accumulator -= pdt;
            if (this.enableGravity) {
                
                this.gravity(this.entities)
            }
        

        }

    }


    gravity(entities) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.pos.x += this.gVector.x;
            entity.pos.y += this.gVector.y;

        }
    }



    getDelta(now) {
        if (!this.prevTime) { this.prevTime = now; }
        let dt = (now - this.prevTime) / 1000;
        this.prevTime = now;
        return dt;
    }

    addEntity(entity) {
        this.entities.push(entity);
    }
}