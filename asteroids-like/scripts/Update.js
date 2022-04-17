import { Vector } from "./Vector.js";
import { Helper } from "./helperFunctions.js";
import { Engine } from "./Engine.js";
import { engine } from "./app.js";
import { Input } from "./Input.js";

export class Update {
    constructor(stepSize, enableGravity, gLength, gAngle, enableFriction, f) {
        this.stepSize = stepSize;
        this.accumulator = 0;
        this.enableGravity = enableGravity;
        this.gVector = new Vector();
        this.gVector.setLength(gLength);
        this.gVector.setAngle(gAngle);
        this.enableFriction = enableFriction;
        this.f = f;
    }

    update(player, projectiles, entities) {
        const dt = this.getDelta(this.stepSize)
        this.updatePlayer(player, dt);
        this.updateProjectiles(projectiles, dt);
        this.updateEntities(entities, dt);
        this.physics(entities, projectiles, player, dt)
    }
    
    updateEntities(entities, dt) {
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            entity.update(dt);
            if (Update.EntityMethods.isOutOfLifetime(entity)) {
                Update.EntityMethods.killEntity(entity, entities);
            }
            
        }
    }

    updateProjectiles(projectiles, dt) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const entity = projectiles[i];
            entity.update(dt);
            if (Update.EntityMethods.isOutOfLifetime(entity)) {
                Update.EntityMethods.killEntity(entity, projectiles);
            }    
        }
    }

    updatePlayer(player, dt) {
        player.update(dt);
    }

    physics(entities, projectiles, player, dt) {
        this.getPhysicsDelta(entities, projectiles, player, dt);
    }


    getPhysicsDelta(entities, projectiles, player, dt) {
        let pdt = 0.01;
        this.accumulator += dt;
        
        while (this.accumulator >= pdt) {
            this.accumulator -= pdt;
            if (this.enableGravity) {
                
                this.gravity(entities)
            }
            this.detectPlayerCollisions(entities, player);
            this.detectProjectileCollisions(projectiles, entities);
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
        let dt = (now) / 1000;
        return dt;
    }

    detectPlayerCollisions(entities, player) {
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            if (this.checkCircleCollision(entity, player)) {
                entity.angle *= -1;
                player.angle *= -1;
                this.entityPushback(entity, player);
            }
        }
    }

    detectProjectileCollisions(projectiles, entities) {
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];
            for (let j = entities.length - 1; j >= 0; j--) {
                const entity = entities[j];
                if (this.checkCircleCollision(projectile, entity)) {
                    
                    Update.EntityMethods.killEntity(projectile, projectiles);
                    Engine.Spawner.spawnAsteroidsFromAsteroid(engine, entity)
                    Update.EntityMethods.killEntity(entity, entities);
                    
                }
            }
        }
    }

    

    entityPushback(entity1, entity2) {
        let dx = entity2.pos.x - entity1.pos.x;
        let dy = entity2.pos.y - entity1.pos.y;

        const Length = Math.sqrt(dx*dx + dy*dy);

        const step = entity1.radius + entity2.radius - Length;

        if (step > 0) {

            dx /= Length; dy /= Length;
            
            entity1.pos.x -= dx*step/2; entity1.pos.y -= dy*step/2;
            entity2.pos.x += dx*step/2; entity2.pos.y += dy*step/2; 
        }
    }

    checkCircleCollision(entity, collisionEntity) {
        const dx = collisionEntity.pos.x - entity.pos.x;
        const dy = collisionEntity.pos.y - entity.pos.y;
        const radii = entity.hitboxRadius + collisionEntity.hitboxRadius;
        if ( ( dx * dx ) + (dy * dy ) < radii * radii) {
            return true;
        } else {
            return false;
        }
    }

    static Physics = class {
        static Movement = class {

            static move(dt, entity, speed, speedScaling, angle) {
                entity.pos.x += speed * speedScaling * Math.cos(angle) * dt;
                entity.pos.y += speed * speedScaling * Math.sin(angle) * dt;
            }

            static moveTowardsTarget(dt, entity, target, speedScaling) {

                const dx = Helper.Math.Geometry.getDeltaX(entity.pos, target);
                const dy = Helper.Math.Geometry.getDeltaY(entity.pos, target);
                
                const distance = Helper.Math.Geometry.getDistance(dx, dy);
  
                const angle = Helper.Math.Trig.getAngleBetweenPoints(entity.pos, target);
    
                this.move(dt, entity, distance, speedScaling, angle);
            }

            static rotateShape(shape) {
                if (shape.rotationSpeed) {
                    shape.rotationAngle += shape.rotationSpeed;
                } else {
                    shape.rotationAngle = Helper.Movement.getRotationAngle(shape);
                }
            }
        }
    }

    static EntityMethods = class {
        static updateLifetime(dt, entity) {
            entity.lifetime -= dt;
        }
        
        static isOutOfLifetime(entity) {
            return (entity.lifetime !== undefined && entity.lifetime <= 0)      
        }

        static killEntity(entity, entities) {
            entities.splice(entities.indexOf(entity), 1);
        }
    }
}