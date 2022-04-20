import { Draw } from "./Draw.js";
import { Menu } from "./Menu.js";
import { Update } from "./Update.js";
import { Input } from "./Input.js";
import { Spawner } from "./Spawner.js";

export class Engine {
    constructor() {
        this.menu = new Menu();
        this.update = new Update(6);
        this.entities = [];
        this.projectiles = [];
        this.player;
        this.paused = false;
        this.dt = 0;
    }


    initialize(stepSize, asteroidAmount) {
        this.update = new Update(stepSize);
        Spawner.spawnPlayer(this);
        Spawner.spawnAsteroids(this, asteroidAmount);
    }

    start() {
        function gameLoop() {
            if (this.paused) {
                this.menu.pauseMsg = "Press P to resume the game";
                Draw.canvasMethods.drawScreen("black", this.menu, this.player, this.projectiles, this.entities);
                return 0;
            } else {           
                this.update.update(this, this.player, this.entities, this.projectiles);
                this.menu.lives = this.player.lives;
                this.menu.pauseMsg = "Press P to pause the game";
                Draw.canvasMethods.drawScreen("black", this.menu, this.player, this.projectiles, this.entities);
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

        if (Input.keyInputObject["KeyP"] !== false) {
            this.paused = !this.paused;
            if (this.paused === false) {
                this.dt = 0;
                this.start();
            }
        }
    }
}

