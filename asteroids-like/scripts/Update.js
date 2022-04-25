export class Update {
    constructor(stepSize) {
        this.stepSize = stepSize;
        this.accumulator = 0;
        this.clearCount = 0;

    }

    update(engine, player, entities, projectiles) {
        const dt = this.getDelta(this.stepSize)
        if (this.gameOverCheck(player) === false) {
            this.detectEntityToEntitiesCollision(player, entities);
            this.detectEntitiesToEntitiesCollisions(engine, projectiles, entities);
            player.update(dt, engine, engine.canvas)
            this.updateEntities(engine, dt, projectiles);
            this.updateEntities(engine, dt, entities);
            this.checkEntitiesLeft(engine, entities);
        } else {
            this.clearCount = 0;
            entities.length = 0;
            if (engine.input.keyInputObject["Enter"]) {
                this.updateHighScore(engine);
                this.saveHighScoreToLocalStorage(engine.menu.highScore);
                console.log(engine.menu.highScore);
                engine.restart(engine, engine.spawner.baseAsteroidAmount);
            }
        }
    }

    updateHighScore(engine) {
        this.addScoreToHighScore(engine.menu.score, engine.menu.highScore);
        // sort highscore list from greatest to least.
        const sortedHighScore = this.sortHighScore(engine);
        engine.menu.highScore = sortedHighScore;
    }

    sortHighScore(engine) {
        return Object.fromEntries(
            Object.entries(engine.menu.highScore).sort(([, a], [, b]) => b - a)
        );
    }

    addScoreToHighScore(score, highScore) {

        // score should at least be 0 before letting the player submit their score.
        if (score <= 0) {
            return;
        }
        const playerName = window.prompt("Please enter your name to submit your score local highscore, or leave blank to skip.");

        // If the player does not wish to submit their score, exit function without doing anything.
        if (playerName === "") {
            return;
        }

        // Add score to highscore object with playerName as key. 
        highScore[playerName] = score;



    }

    saveHighScoreToLocalStorage(highScore) {
        console.log("saving highscore to local storage")
    }

    gameOverCheck(player) {
        if (player.lives > 0) {
            return false;
        }
        if (player.lives <= 0) {
            return true;
        }
    }

    checkEntitiesLeft(engine, entities) {
        if (entities.length <= 0) {
            this.clearCount++;
            engine.menu.score += 100 * this.clearCount;
            engine.spawner.spawnAsteroids(engine, engine.spawner.baseAsteroidAmount + this.clearCount);
        }
    }

    updateEntities(engine, dt, entities) {
        for (let i = entities.length - 1; i >= 0; i--) {
            const entity = entities[i];
            entity.update(engine.canvas, dt, entities) 
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
            const currDist = player.getDistanceToEntity(entity);
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
                const currDist = entity1.getDistanceToEntity(entity2);
                if (j === entities2.length - 1) {
                    ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity2));
                } else if (currDist < dist) {
                    ({ dist, closestEntity } = this.setClosestDistanceAndEntity(dist, currDist, closestEntity, entity2));
                }
            }
            if (this.checkCircleCollision(entity1, closestEntity)) {
                entity1.killEntity(entities1);
                engine.spawner.spawnAsteroidsFromAsteroid(engine, closestEntity)
                engine.menu.score += closestEntity.radius;
                closestEntity.killEntity(entities2);
                
            }
        }
    }

    setClosestDistanceAndEntity(dist, currDist, closestEntity, entity) {
        dist = currDist;
        closestEntity = entity;
        return { dist, closestEntity };
    }

    entityPushback(entity1, entity2) {
        let {dx, dy} = entity1.getDeltas(entity2);
        const length = entity1.getDistanceToEntity(entity2);
        const step = entity1.radius + entity2.radius - length;
        if (step > 0) {
            dx /= length; dy /= length;
            entity1.pos.x -= dx*step/2; entity1.pos.y -= dy*step/2;
            entity2.pos.x += dx*step/2; entity2.pos.y += dy*step/2;
        }
    }

    checkCircleCollision(entity, collisionEntity) {
        const {dx, dy} = entity.getDeltas(collisionEntity);
        const radii = entity.hitboxRadius + collisionEntity.hitboxRadius;
        if ( ( dx * dx ) + (dy * dy ) < radii * radii) {
            return true;
        } else {
            return false;
        }
    }
}

