import { Asteroid } from "./Asteroid.js";
import { CanvasClass } from "./Canvas.js";
import { Draw } from "./Draw.js";
import { Helper } from "./HelperFunctions.js";
import { Player } from "./Player.js";
import { Point2d } from "./Point2d.js";
import { Projectile } from "./Projectile.js";

export class Engine {
    constructor(physics) {
        this.physics = physics;
        this.entities = [];
        this.projectiles = [];
        this.player;
        this.paused = false;
        this.lastFrame = 0;
        this.dt = 0;
        this.time = 0;
    }
    static Spawner = class {
        static spawnAsteroids(engine, count) {
            const radius = [15, 30, 60]
            for (let i = 0; i < count; i++) {
                const x = Math.floor(Helper.Math.Random.getRandomArbitrary(0, CanvasClass.canvas.width)),
                    y = Math.floor(Helper.Math.Random.getRandomArbitrary(0, CanvasClass.canvas.height)),
                    sideNumber = Math.floor(Helper.Math.Random.getRandomArbitrary(5, 15)),
                    angle = Math.floor(Helper.Math.Random.getRandomArbitrary(0, Math.PI * 2));
                this.spawnAsteroid(engine, x, y, sideNumber, radius, angle);
            }
        }

        static spawnAsteroidsFromAsteroid(engine, asteroid) {
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

        static spawnAsteroid(engine, x, y, sideNumber, radius, angle) {
            const pos = new Point2d(x, y);
            const randomRadiiSelector = Helper.Math.Random.getRandomInt(0, radius.length);
            const asteroid = new Asteroid(pos, sideNumber, radius[randomRadiiSelector], angle)
            engine.addEntity(asteroid);
        }

        static spawnPlayer(engine) {
            const pos = new Point2d(CanvasClass.canvas.width / 2, CanvasClass.canvas.height / 2)
            const player = new Player(pos, 3, 30)
            engine.player = player;
        }

        static spawnProjectile(engine, shooterPosition, shooterAngle) {
            const position = new Point2d(shooterPosition.x, shooterPosition.y);
            const bullet = new Projectile(position, shooterAngle);
            engine.addProjectile(bullet);
        }
    }

    start() {
        function gameLoop() {
            if (this.paused) {
                return 0;
            } else {
                const player = this.player;                
                this.physics.update(player, this.projectiles, this.entities);
                Draw.canvasMethods.drawScreen(CanvasClass.canvas, "black", player, this.projectiles, this.entities);
                requestAnimationFrame(gameLoop.bind(this));
            }
        }
        requestAnimationFrame(gameLoop.bind(this));
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }
}

