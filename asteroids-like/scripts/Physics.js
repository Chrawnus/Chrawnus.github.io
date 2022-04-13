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
    }

    update(now, entities) {

        let dt = this.getDelta(now);
        this.updateEntities(entities, dt);
        this.physics(entities, dt)
    }
    
    updateEntities(entities, dt) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            this.checkLifetime(entity, entities);
            entity.update(dt);
        }
    }

    checkLifetime(entity, entities) {
        if (entity.lifetime !== undefined && entity.lifetime <= 0) {
            this.killEntity(entities, entity);
        }
    }

    killEntity(entities, entity) {
        entities.splice(entities.indexOf(entity), 1);
    }

    physics(entities, dt) {
        this.getPhysicsDelta(entities, dt);
    }


    getPhysicsDelta(entities, dt) {

        let pdt = 0.01;
        this.accumulator += dt;
        
        while (this.accumulator >= pdt) {
            this.accumulator -= pdt;
            if (this.enableGravity) {
                
                this.gravity(entities)
            }
            this.detectCollisions(entities);

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

    detectCollisions(entities) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            for (let j = i + 1; j < entities.length; j++) {
                const collisionEntity = entities[j];
                if(this.checkCollision(collisionEntity, entity)) {
                    
                } else {

                }
            }
        }
    }


    checkCollision(entity, collisionEntity) {
        const dx = collisionEntity.pos.x - entity.pos.x;
        const dy = collisionEntity.pos.y - entity.pos.y;
        const radii = entity.hitboxRadius + collisionEntity.hitboxRadius;
        if ( ( dx * dx ) + (dy * dy ) < radii * radii) {
            return true;
        } else {
            return false;
        }
    }

}