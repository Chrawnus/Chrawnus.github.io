import { Draw } from "./Draw.js";
import { Menu } from "./Menu.js";
import { Physics } from "./Physics.js";
import { Input } from "./Input.js";
import { Spawner } from "./Spawner.js";
import { HighScore } from "./HighScore.js";

export class Engine {
    constructor(stepSize) {
        this.prevTime = 0;
        this.stepSize = stepSize / 1000;
        this.accumulator = 0;

        this.canvas = Draw.Canvas.gameScreen;
        this.menu = new Menu(this.canvas.width, this.canvas.height);
        this.physics = new Physics(6);
        this.input = new Input();
        this.spawner = new Spawner();
        this.entities = [];
        this.projectiles = [];
        this.player;
        this.pauseState = false;
        this.dt = 0;
    }

    // Initial setup of the different parts 
    // of the engine. 
    initialize(canvasWidth, canvasHeight) {
        this.physics = new Physics();
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.menu.highScores = HighScore.retrieveHighscores();
        this.spawner.spawnPlayer(this);
        this.spawner.spawnAsteroids(this, this.spawner.baseAsteroidAmount);
    }

    // restarts the engine and resets everything back to default when the player dies. 
    restart(engine, asteroidAmount) {
        this.resetPlayer();
        this.resetMenu();
        console.log(this.physics.clearCount)
        this.spawner.spawnAsteroids(engine, asteroidAmount);
    }

    resetMenu() {
        this.menu.score = 0;
    }

    resetPlayer() {
        this.player.lives = 3;
        this.player.fireDelayTime = this.player.maxFireDelay;
    }

    start() {
        function gameLoop(now) {
            if (this.pauseState) {
                // set prevTime to 0 to make sure dt 
                // doesn't grow while the game is paused.
                this.prevTime = 0; 
                Draw.canvasMethods.drawScreen("black",this, this.menu, this.player, this.entities, this.projectiles);
                return;
            }
            //const now = performance.now();
            const dt = this.getDelta(now)
            this.handleUpdate(dt);
            
            this.menu.lives = this.player.lives;
            Draw.canvasMethods.drawScreen("black", this, this.menu, this.player, this.entities, this.projectiles);
            requestAnimationFrame(gameLoop.bind(this));

        }
        requestAnimationFrame(gameLoop.bind(this));
    }

    /* function that handles the rate
       of "physics" updates to try and
       ensure the game runs at the same
       speed regardless of the monitor 
       refresh rate.*/
    handleUpdate(dt) {
        this.accumulator += dt;
        while (this.accumulator >= this.stepSize) {
            this.physics.update(this.stepSize, this, this.player, this.entities, this.projectiles);
            this.accumulator -= this.stepSize;
        }
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }

    getDelta(now) {
        if (!this.prevTime) { this.prevTime = now; }
        let dt = (now - this.prevTime) / 1000;
        this.prevTime = now;
        return dt;
    }
}

