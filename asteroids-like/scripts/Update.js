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
        if (entities.length <= 0) {
            return 0;
        }
        let closestEntity;
        let dist;

        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            const dx = Helper.Math.Geometry.getDeltaX(player, entity);
            const dy = Helper.Math.Geometry.getDeltaY(player, entity);
            const currDist = Helper.Math.Geometry.getDistance(dx, dy);
            
            if (i === entities.length - 1) {
                closestEntity = entity;
                dist = currDist;
            } else if (currDist < dist) {
                dist = currDist;
                closestEntity = entity;
            }


        }

        if (this.checkCircleCollision(closestEntity, player)) {
            closestEntity.angle *= -1;
            player.angle *= -1;
            this.entityPushback(closestEntity, player);
        }
    }

    detectProjectileCollisions(projectiles, entities) {
        if (entities.length <= 0) {
            return 0;
        }
        let closestEntity;
        let dist;
        for (let i = projectiles.length - 1; i >= 0; i--) {
            const projectile = projectiles[i];

            for (let j = entities.length - 1; j >= 0; j--) {
                const entity = entities[j];
                const dx = Helper.Math.Geometry.getDeltaX(projectile, entity);
                const dy = Helper.Math.Geometry.getDeltaY(projectile, entity);
                const currDist = Helper.Math.Geometry.getDistance(dx, dy);
                if (j === entities.length - 1) {
                    closestEntity = entity;
                    dist = currDist;
                } else if (currDist < dist) {
                    dist = currDist;
                    closestEntity = entity;
                }

            }
            if (this.checkCircleCollision(projectile, closestEntity)) {     
                Update.EntityMethods.killEntity(projectile, projectiles);
                Engine.Spawner.spawnAsteroidsFromAsteroid(engine, closestEntity)
                Update.EntityMethods.killEntity(closestEntity, entities);
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
        console.log(entity, collisionEntity)
        const dx = Helper.Math.Geometry.getDeltaX(entity, collisionEntity);
        const dy = Helper.Math.Geometry.getDeltaY(entity, collisionEntity);
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

                const dx = Helper.Math.Geometry.getDeltaX(entity, target);
                const dy = Helper.Math.Geometry.getDeltaY(entity, target);
                
                const distance = Helper.Math.Geometry.getDistance(dx, dy);
  
                const angle = Helper.Math.Trig.getAngleBetweenPoints(entity, target);
    
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