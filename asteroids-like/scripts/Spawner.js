import { Player } from "./Player.js";
import { Projectile } from "./Projectile.js";
import { Helper } from "./HelperFunctions.js";
import { Asteroid } from "./Asteroid.js";

export class Spawner {
    constructor() {

    }
    spawnAsteroids(engine, count) {
        const radius = [15, 30, 60]
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Helper.Math.Random.getRandomArbitrary(0, engine.canvas.width)),
                y = Math.floor(Helper.Math.Random.getRandomArbitrary(0, engine.canvas.height)),
                sideNumber = Math.floor(Helper.Math.Random.getRandomArbitrary(5, 15)),
                angle = Math.floor(Helper.Math.Random.getRandomArbitrary(0, Math.PI * 2));
            this.spawnAsteroid(engine, x, y, sideNumber, radius, angle);
        }
    }

    spawnAsteroidsFromAsteroid(engine, asteroid) {
        const allowedRadii = [15, 30, 60]
        for (let i = allowedRadii.length - 1; i >= 0; i--) {
            if (allowedRadii[i] >= asteroid.radius) {
                allowedRadii.splice(i, 1);
            }
        }
        allowedRadii.splice(0, allowedRadii.length - 1);
        if (allowedRadii.length === 0) {
            return 0;
        }
        for (let i = 0; i < 3; i++) {
            const x = asteroid.pos.x,
                y = asteroid.pos.y,
                sideNumber = Math.floor(Helper.Math.Random.getRandomArbitrary(5, 15)),
                angle = Helper.Math.Random.getRandomArbitrary(0, Math.PI * 2);
            this.spawnAsteroid(engine, x, y, sideNumber, allowedRadii, angle);
        }
    }

    spawnAsteroid(engine, x, y, sideNumber, radius, angle) {
        const randomRadiiSelector = Helper.Math.Random.getRandomInt(0, radius.length);
        const asteroid = new Asteroid(x, y, sideNumber, radius[randomRadiiSelector], angle)
        engine.addEntity(asteroid);
    }

    spawnPlayer(engine) {
        const x = engine.canvas.width / 2;
        const y = engine.canvas.height / 2;
        const player = new Player(x, y, 3, 30)
        engine.player = player;
    }

    spawnProjectile(engine, shooterPosition, shooterAngle) {
        const x = shooterPosition.x;
        const y = shooterPosition.y;
        const bullet = new Projectile(x, y, shooterAngle);
        engine.addProjectile(bullet);
    }
}