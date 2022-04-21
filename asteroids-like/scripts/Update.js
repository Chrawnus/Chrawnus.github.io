import { Helper } from "./HelperFunctions.js";

export class Update {
    constructor(stepSize) {
        this.stepSize = stepSize;
        this.accumulator = 0;
    }

    update(engine, player, entities, projectiles) {
        const dt = this.getDelta(this.stepSize)
        this.updatePlayer(engine, dt, player);
        this.updateProjectiles(engine, dt, projectiles);
        this.updateEntities(engine, entities, dt);
        this.physics(dt, engine, player, entities, projectiles)

    }

    updateEntities(engine, entities, dt) {
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            Update.Physics.Movement.rotateShape(engine, dt, entity);
            Update.Physics.Movement.wrap(engine.canvas, entity)
            Update.Physics.Movement.move(dt, entity, entity.speed, entity.speedScaling, entity.angle); 
        }
    }

    updatePlayer(engine, dt, player) {
        this.handleInputs(engine, dt, player);
        Update.Physics.Movement.rotateShape(engine, dt, player);
        Update.Physics.Movement.wrap(engine.canvas, player)
    }

    updateProjectiles(engine, dt, projectiles) {
        for (let i = 0; i < projectiles.length; i++) {
            const projectile = projectiles[i];
            Update.EntityMethods.updateLifetime(dt, projectile);
            if (Update.EntityMethods.isOutOfLifetime(projectile)) {
                Update.EntityMethods.killEntity(projectile, projectiles);
            }
            Update.Physics.Movement.wrap(engine.canvas, projectile)
            Update.Physics.Movement.move(dt, projectile, projectile.speed, projectile.speedScaling, projectile.angle);
        }

    }

    updateEntity(entity, dt) {
        entity.update(dt);

    }

    handleInputs(engine, dt, entity) {
        if (engine.input.mouseInputObject["2"]) {
            Update.Physics.Movement.moveTowardsTarget(dt, entity, engine.input.Cursor.mouseC, entity.speedScaling);
        }
        if (engine.input.mouseInputObject[0]) {
            this.shootProjectile(entity, engine);
        }
    }

    physics(dt, engine, player, entities, projectiles) {
        this.getPhysicsDelta(dt, engine, player, entities, projectiles);
    }

    shootProjectile(player, engine) {
        const mousePos = engine.input.Cursor.mouseC;
        const angle = Helper.Math.Trig.getAngleBetweenEntities(player, mousePos);
        engine.spawner.spawnProjectile(engine, player.pos, angle);
    }

    getPhysicsDelta(dt, engine, player, entities, projectiles) {
        let pdt = 0.01;
        this.accumulator += dt;
        while (this.accumulator >= pdt) {
            this.accumulator -= pdt;
            this.detectEntityToEntitiesCollision(player, entities);
            this.detectEntitiesToEntitiesCollisions(engine, projectiles, entities);
        }
    }

    getDelta(now) {
        let dt = (now) / 1000;
        return dt;
    }

    detectEntityToEntitiesCollision(player, entities) {
        if (entities.length <= 0) {
            return 0;
        }
        let closestEntity;
        let dist;
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            const currDist = Helper.Math.Geometry.getDistanceBetweenEntities(player, entity);
            if (i === entities.length - 1) {
                ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity));
            } else if (currDist < dist) {
                ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity));
            }
        }
        if (this.checkCircleCollision(closestEntity, player)) {
            closestEntity.angle *= -1;
            player.angle *= -1;
            this.entityPushback(closestEntity, player);
            player.onCollision();
        }
    }

    detectEntitiesToEntitiesCollisions(engine, entities1, entities2) {
        if (entities2.length <= 0) {
            return 0;
        }
        let closestEntity;
        let dist;
        for (let i = entities1.length - 1; i >= 0; i--) {
            const entity1 = entities1[i];
            for (let j = entities2.length - 1; j >= 0; j--) {
                const entity2 = entities2[j];
                const currDist = Helper.Math.Geometry.getDistanceBetweenEntities(entity1, entity2);
                if (j === entities2.length - 1) {
                    ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity2));
                } else if (currDist < dist) {
                    ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity2));
                }
            }
            if (this.checkCircleCollision(entity1, closestEntity)) {
                Update.EntityMethods.killEntity(entity1, entities1);
                engine.spawner.spawnAsteroidsFromAsteroid(engine, closestEntity)
                Update.EntityMethods.killEntity(closestEntity, entities2);
            }
        }
    }

    setClosestDistanceAndEntity(dist, currDist, closestEntity, entity) {
        dist = currDist;
        closestEntity = entity;
        return { dist, closestEntity };
    }

    entityPushback(entity1, entity2) {
        let {dx, dy} = Helper.Math.Geometry.getDeltas(entity1, entity2);
        const length = Helper.Math.Geometry.getDistanceBetweenEntities(entity1, entity2);
        const step = entity1.radius + entity2.radius - length;
        if (step > 0) {
            dx /= length; dy /= length;
            entity1.pos.x -= dx*step/2; entity1.pos.y -= dy*step/2;
            entity2.pos.x += dx*step/2; entity2.pos.y += dy*step/2;
        }
    }

    checkCircleCollision(entity, collisionEntity) {
        const {dx, dy} = Helper.Math.Geometry.getDeltas(entity, collisionEntity);
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
                entity.pos.x += (speed * speedScaling * Math.cos(angle) * dt);
                entity.pos.y += (speed * speedScaling * Math.sin(angle) * dt);
            }
            static wrap(canvas, entity) {
                const wrapDestination = Helper.EntityMethods.isOutsideCanvas(canvas, entity)
                if (wrapDestination) {
                    Helper.EntityMethods.wrapTo(canvas, entity, wrapDestination);
                }
            }
            static moveTowardsTarget(dt, entity, target, speedScaling) {
                const distance = Helper.Math.Geometry.getDistanceBetweenEntities(entity, target);
                const angle = Helper.Math.Trig.getAngleBetweenEntities(entity, target);
                this.move(dt, entity, distance, speedScaling, angle);
            }
            static rotateShape(engine, dt, shape) {
                if (shape.rotationSpeed) {
                    shape.rotationAngle += shape.rotationSpeed * dt;
                } else {
                    shape.rotationAngle = Helper.Movement.getRotationAngle(shape, engine.input.Cursor.mouseC);
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

