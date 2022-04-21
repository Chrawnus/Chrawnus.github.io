import { Draw } from "./Draw.js";
import { Menu } from "./Menu.js";
import { Update } from "./Update.js";
import { Input } from "./Input.js";
import { Spawner } from "./Spawner.js";

export class Engine {
    constructor() {
        this.canvas = Draw.Canvas.gameScreen;
        this.menu = new Menu();
        this.update = new Update(6);
        this.input = new Input();
        this.spawner = new Spawner();
        this.entities = [];
        this.projectiles = [];
        this.player;
        this.paused = false;
        this.dt = 0;
    }


    initialize(stepSize, canvasWidth, canvasHeight, asteroidAmount) {
        this.update = new Update(stepSize);
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.spawner.spawnPlayer(this);
        this.spawner.spawnAsteroids(this, asteroidAmount);

    }

    start() {
        function gameLoop() {
            if (this.paused) {
                this.menu.pauseMsg = "Press P to resume the game";
                Draw.canvasMethods.drawScreen("black", this.menu, this.player, this.entities, this.projectiles);
                return 0;
            } else {           
                this.update.update(this, this.player, this.entities, this.projectiles);
                this.menu.lives = this.player.lives;
                this.menu.pauseMsg = "Press P to pause the game";
                Draw.canvasMethods.drawScreen("black", this.menu, this.player, this.entities, this.projectiles);
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

    switchPauseState(e) {
        if (e.code !== "KeyP") {
            return 0
        }
        this.paused = !this.paused;
        if (this.paused === false) {
            this.dt = 0;
            this.start();
        }
    }
}

