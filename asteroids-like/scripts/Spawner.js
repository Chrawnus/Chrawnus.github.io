import { Player } from "./Player.js";
import { Projectile } from "./Projectile.js";
import { Helper } from "./HelperFunctions.js";
import { Asteroid } from "./Asteroid.js";

export class Spawner {
    constructor() {
        this.baseAsteroidAmount = 3;
    }
    spawnAsteroids(engine, count) {
        const radiusArray = [15, 30, 60]
        let radius;


        for (let i = 0; i < count; i++) {
            const x = Math.floor(Helper.Math.Random.getRandomOfTwoRanges(-60, 0, engine.canvas.width, engine.canvas.width + 60)),
                y = Math.floor(Helper.Math.Random.getRandomOfTwoRanges(-60, 0, engine.canvas.height, engine.canvas.height + 60));
            radius = radiusArray[i%3];
            const { sideNumber, angle, speed, rotationSpeed } = this.getAsteroidValues();
            this.spawnAsteroid(engine, x, y, sideNumber, radius, angle, speed, rotationSpeed);
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
                y = asteroid.pos.y;
            const { sideNumber, angle, speed, rotationSpeed } = this.getAsteroidValues();
            this.spawnAsteroidFromAsteroid(engine, x, y, sideNumber, allowedRadii, angle, speed, rotationSpeed);
        }
    }
    
    getAsteroidValues() {
        const sideNumber = Helper.Math.Random.getRandomInt(5, 16), angle = Helper.Math.Random.getRandomArbitrary(0, Math.PI * 2), speed = Helper.Math.Random.getRandomInt(150, 201), rotationSpeed = Helper.Math.Random.getRandomArbitrary((Math.PI * 2) * -1, Math.PI * 2);
        return { sideNumber, angle, speed, rotationSpeed };
    }

    spawnAsteroid(engine, x, y, sideNumber, radius, angle, speed, rotationSpeed) {
        const asteroid = new Asteroid(x, y, sideNumber, radius, angle, speed, rotationSpeed);
        engine.addEntity(asteroid);
    }

    spawnAsteroidFromAsteroid(engine, x, y, sideNumber, radius, angle, speed, rotationSpeed) {
        const randomRadiiSelector = Helper.Math.Random.getRandomInt(0, radius.length);
        const asteroid = new Asteroid(x, y, sideNumber, radius[randomRadiiSelector], angle, speed, rotationSpeed)
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