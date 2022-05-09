import { HighScore } from "./HighScore.js";

export class Physics {
    constructor() {
        this.clearCount = 0;
    }

    update(dt, engine, player, entities, projectiles) {
        if (this.gameOverCheck(player) === false) {
            this.detectCollisions(player, entities, engine, projectiles);
            this.updateAllEntities(player, dt, engine, projectiles, entities);
            this.checkScreenCleared(engine, entities, player);
        } else {
            this.gameOver(entities, engine);
        }
    }

    gameOverCheck(player) {
        if (player.lives > 0) {
            return false;
        }
        if (player.lives <= 0) {
            return true;
        }
    }

    detectCollisions(player, entities, engine, projectiles) {
        this.detectEntityToEntitiesCollision(player, entities);
        this.detectEntitiesToEntitiesCollisions(engine, projectiles, entities);
    }

    updateAllEntities(player, dt, engine, projectiles, entities) {
        player.update(dt, engine, engine.canvas);
        this.updateEntities(engine, dt, projectiles);
        this.updateEntities(engine, dt, entities);
    }

    /*
    Checks if all asteroids have been
    cleared from the screen and spawns new 
    asteroids.
    */
    checkScreenCleared(engine, entities, player) {
        if (entities.length <= 0) {
            this.clearCount++;

            // Increase player score, scaled by the amount of times the screen has been cleared.
            engine.menu.score += 100 * this.clearCount;

            // Spawn more asteroids, increase the amount by +1 for each time the screen is cleared.
            engine.spawner.spawnAsteroids(engine, engine.spawner.baseAsteroidAmount + this.clearCount);
            player.upgrade();
        }
    }

    /*
    Handle game over
    */
    gameOver(entities, engine) {
        // reset clear count and empty entities array 
        this.clearCount = 0;
        entities.length = 0;

        if (engine.input.keyInputObject["Enter"]) {
            // call addScoreToHighScore in order to check if current score
            // is high enough to add to Local Highscore.
            HighScore.addScoreToHighScore(engine.menu.score, HighScore.highScores);

            // Get current highScore list from local storage in order 
            // to display it on screen on next game over.
            engine.menu.highScores = HighScore.retrieveHighscores();

            engine.restart(engine, engine.spawner.baseAsteroidAmount);
        }
    }

    /*
    loops through an array of entities 
    and calls the update function for 
    every member in the array.
    */
    updateEntities(engine, dt, entities) {
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            entity.update(engine.canvas, dt, entities)
        }
    }

    /*
    Checks for and handles collisions 
    between a single entity 
    and an array of entities.
    */
    detectEntityToEntitiesCollision(loneEntity, entities) {
        // if array of entities is empty
        // return early to avoid errors. 
        if (entities.length <= 0) {
            return 0;
        }

        let closestEntity;
        let distanceToClosest;

        // loop through the entities array in order
        // to see which entity in the array is closest
        // to loneEntity.
        for (let i = entities.length - 1; i >= 0; i--) {

            const entity = entities[i];

            // get distance to current entity from loneEntity.
            const currDist = loneEntity.getDistanceToEntity(entity);

            // if we're at the start of the loop set current entity
            // and distance to current entity as closestEntity
            // and distanceToClosest respectively
            if (i === entities.length - 1) {
                ({ dist: distanceToClosest, closestEntity } = this.setClosestDistanceAndEntity(distanceToClosest, currDist, closestEntity, entity));
            }

            // update distanceToClosest and closestEntity
            // if distance to current entity from loneEntity
            // is closer than distanceToClosest.
            if (currDist < distanceToClosest) {
                ({ dist: distanceToClosest, closestEntity } = this.setClosestDistanceAndEntity(distanceToClosest, currDist, closestEntity, entity));
            }
        }

        // check if loneEntity and closestEntity are colliding
        if (this.checkCircleCollision(closestEntity, loneEntity)) {
            // reverse direction of closestEntity.
            closestEntity.angle *= -1;

            // call pushback function for both entities involved in the collision
            closestEntity.pushback(closestEntity, loneEntity);
            loneEntity.pushback(loneEntity, closestEntity);

            // handle loneEntity collision logic. 
            loneEntity.onCollision();
        }
    }

    /*
    Checks for and handles collisions 
    between two separate arrays of entities
    */
    detectEntitiesToEntitiesCollisions(engine, entities1, entities2) {
        // if array of entities2 is empty
        // return early to avoid errors. 
        if (entities2.length <= 0) {
            return 0;
        }

        let closestEntity;
        let dist;

        // loop through first array of entities
        for (let i = entities1.length - 1; i >= 0; i--) {
            const entity1 = entities1[i];

            // loop through second array of entities
            for (let j = entities2.length - 1; j >= 0; j--) {
                const entity2 = entities2[j];

                // get distance from entity1 to entity2
                const currDist = entity1.getDistanceToEntity(entity2);

                // if we're at the start of the loop set current entity2
                // and distance to current entity2 as closestEntity
                // and distanceToClosest respectively.
                if (j === entities2.length - 1) {
                    ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity2));
                }

                // update distanceToClosest and closestEntity
                // if distance to current entity2 from entity1
                // is closer than distanceToClosest.
                if (currDist < dist) {
                    ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity2));
                }
            }

            // check if entity1 and closestEntity are colliding.
            if (this.checkCircleCollision(entity1, closestEntity)) {

                //destroy entity1
                entity1.killEntity(entities1);

                // handle collision logic for closestEntity
                closestEntity.onCollision(entities2, engine)

                // update player score
                engine.menu.score += closestEntity.radius;
            }
        }
    }

    setClosestDistanceAndEntity(dist, currDist, closestEntity, entity) {
        dist = currDist;
        closestEntity = entity;
        return { dist, closestEntity };
    }

    // check if two circles are colliding
    checkCircleCollision(entity, collisionEntity) {
        const { dx, dy } = entity.getDeltas(collisionEntity);
        const radii = entity.hitboxRadius + collisionEntity.hitboxRadius;
        if ((dx * dx) + (dy * dy) < radii * radii) {
            return true;
        } else {
            return false;
        }
    }
}

