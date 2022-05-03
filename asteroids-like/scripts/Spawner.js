import { Player } from "./Player.js";
import { Projectile } from "./Projectile.js";
import { Helper } from "./HelperFunctions.js";
import { Asteroid } from "./Asteroid.js";

export class Spawner {
    constructor() {
        this.baseAsteroidAmount = 3; // number of asteroids to spawn on game start/reset.
    }
    /*
    function that handles spawning of asteroids on
    game start and whenever screen is cleared.
    */
    spawnAsteroids(engine, count) {
        // create array of allowed radii
        const radiusArray = [15, 30, 60]
        let radius;

        // spawn [count] number of asteroids
        for (let i = 0; i < count; i++) {

            // get random position just outside of canvas boundary, to decrease
            // chances of a asteroid randomly spawning on and unfairly removing a life
            // from the player.  
            const x = Math.floor(Helper.Math.Random.getRandomOfTwoRanges(-60, 0, engine.canvas.width, engine.canvas.width + 60)),
                y = Math.floor(Helper.Math.Random.getRandomOfTwoRanges(-60, 0, engine.canvas.height, engine.canvas.height + 60));

            // Get a radius value from the radius array. 
            radius = radiusArray[i % 3];

            const { sideNumber, angle, speed, rotationSpeed } = this.getAsteroidValues();
            this.spawnAsteroid(engine, x, y, sideNumber, radius, angle, speed, rotationSpeed);
        }
    }

    /*
    function that handles splintering bigger 
    asteroid into smaller asteroids on collision
    with projectile.
    */
    spawnAsteroidsFromAsteroid(engine, asteroid) {
        // array of 
        const allowedRadii = [15, 30, 60]

        // remove all radii from the array that are bigger
        // than the asteroid's radius
        for (let i = allowedRadii.length - 1; i >= 0; i--) {
            if (allowedRadii[i] >= asteroid.radius) {
                allowedRadii.splice(i, 1);
            }
        }

        // splice the last element in the array.
        allowedRadii.splice(0, allowedRadii.length - 1);

        // if array is empty it means the asteroid is the smallest
        // allowable size, so we return early. 
        if (allowedRadii.length === 0) {
            return 0;
        }

        // create three smaller asteroids
        // at the current asteroid's position
        for (let i = 0; i < 3; i++) {
            const x = asteroid.pos.x,
                y = asteroid.pos.y;
            const { sideNumber, angle, speed, rotationSpeed } = this.getAsteroidValues();
            this.spawnAsteroidFromAsteroid(engine, x, y, sideNumber, allowedRadii, angle, speed, rotationSpeed);
        }
    }

    /*
    function that creates random
    values for to use when spawning
    in asteroids
    */
    getAsteroidValues() {
        const sideNumber = Helper.Math.Random.getRandomInt(5, 16),
            angle = Helper.Math.Random.getRandomArbitrary(0, Math.PI * 2),
            speed = Helper.Math.Random.getRandomInt(150, 201),
            rotationSpeed = Helper.Math.Random.getRandomArbitrary((Math.PI * 2) * -1, Math.PI * 2);
        return { sideNumber, angle, speed, rotationSpeed };
    }

    /*
    function that handles spawning in individual
    asteroids on game start and screen clear
    */
    spawnAsteroid(engine, x, y, sideNumber, radius, angle, speed, rotationSpeed) {
        const asteroid = new Asteroid(x, y, sideNumber, radius, angle, speed, rotationSpeed);
        engine.addEntity(asteroid);
    }

    /*
    function that handles spawning in individual
    asteroids on asteroid-projectile collision.
    */
    spawnAsteroidFromAsteroid(engine, x, y, sideNumber, radius, angle, speed, rotationSpeed) {
        const randomRadiiSelector = Helper.Math.Random.getRandomInt(0, radius.length);
        const asteroid = new Asteroid(x, y, sideNumber, radius[randomRadiiSelector], angle, speed, rotationSpeed)
        engine.addEntity(asteroid);
    }

    /* 
    spawns the player at the middle of canvas
    and adds the player to the engine.
    */
    spawnPlayer(engine) {
        const x = engine.canvas.width / 2;
        const y = engine.canvas.height / 2;
        const player = new Player(x, y, 3, 30)
        engine.player = player;
    }

    /*
    function that handles spawning of projectiles
    when player presses the shoot button
    */
    spawnProjectile(engine, shooterPosition, shooterAngle) {
        // get x and y values of the shooter.
        const x = shooterPosition.x;
        const y = shooterPosition.y;

        //create new Projectile object.
        const bullet = new Projectile(x, y, shooterAngle);

        // add bullet to the engine's array of projectiles. 
        engine.addProjectile(bullet);
    }
}