import { Helper } from "./helperFunctions.js";
import { Drawer } from "./Drawer.js";
import { Physics } from "./Physics.js";
import { canvas } from "./Elements.js";
import { Point2d } from "./Point2d.js";
import { Player } from "./Player.js";
import { Asteroid } from "./Asteroid.js";
import { Projectile } from "./Projectile.js";

const drawer = new Drawer()
const physics = new Physics(false, 0, 90, true, 0.01);





export class Engine{
    constructor ()
    {
        this.canvas = drawer;
        this.physics = physics;
        this.entities = [];
        this.player;
    }

    static Spawner = class {
        
        static spawnAsteroids(engine, count) {
            for (let i = 0; i < count; i++) {
                this.spawnAsteroid(engine);

            }
        }

        static spawnAsteroid(engine) {
            const pos = new Point2d(Helper.Math.Random.getRandomArbitrary(0, canvas.width), Helper.Math.Random.getRandomArbitrary(0, canvas.height));
            const sideNumber = Math.floor(Helper.Math.Random.getRandomArbitrary(5, 15));
            const radius = Helper.Math.Random.getRandomArbitrary(15, 50);
            const angle = Helper.Math.Random.getRandomArbitrary(0, Math.PI * 2);
            const asteroid = new Asteroid(pos, sideNumber, radius, angle)
            engine.addEntity(asteroid);
        }

        static spawnPlayer(engine) {
            const pos = new Point2d(canvas.width/2, canvas.height/2)
            const player = new Player(pos, 3, 30)
            engine.addEntity(player);
            this.player = player;
        }
    }

    start() {
        requestAnimationFrame(gameLoop.bind(this));

        function gameLoop(now) {
            requestAnimationFrame(gameLoop.bind(this));
    
            
            this.physics.update(now, this.entities);
            
            this.canvas.draw(this.entities);
        }
    }

    addEntity(entity) {
        this.entities.push(entity);
    }
}

