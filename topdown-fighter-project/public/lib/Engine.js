import { Initialize } from "./Initialize.js";
import { Pathfinding } from "./pathFinding.js";
import { Drawer } from "./Drawer.js";
import { UserInterface } from "./UserInterface.js";



export class Engine {
    constructor() {
        this.drawer = new Drawer();
        this.userInterface = new UserInterface();
        this.initializer = new Initialize();
        this.pathfinder = new Pathfinding();
        this.elapsed;
    }

    initialize() {
        const initializer = this.initializer;
        const userInterface = this.userInterface;
        initializer.initialize();
        userInterface.initializeMenuButtons(initializer.player, initializer.enemy);
    }
    update(dt, now) {
        const userInterface = this.userInterface;
        const initializer = this.initializer;

        if (!userInterface.running) {
            return
        }
        if (initializer.checkEnemyState()) {
            initializer.player.onEnemyKill();
            initializer.enemy.boostStats();
            initializer.resetEnemyPos();
            userInterface.refreshUI(initializer.player);
        }
        if (initializer.gameOverCheck()) {
            initializer.onGameOver();
            userInterface.onGameOver(initializer.player);
        }
        initializer.getPlayerPosition();
        initializer.getEnemyPosition();

        initializer.player.update(dt, initializer);

        this.increaseElapsed(dt);
        this.refreshPathfinding();
        this.resetElapsed();

        initializer.enemy.update(dt, now, initializer);

    }

    draw() {
        this.drawer.draw(this.initializer.tileGrid, this.initializer.walls, this.initializer);
    }

    refreshPathfinding() {
        const initializer = this.initializer;
        if (initializer.enemy.pathToPlayer === undefined || initializer.enemy.pathToPlayer.length === 0 || this.elapsed > 0.2) {
            initializer.enemy.pathToPlayer = this.pathfinder.update(initializer.tileGrid[initializer.enemy.currentInhabitedTile], initializer.tileGrid[initializer.player.currentInhabitedTile]);
            //elapsed = 0;
        }
    }

    resetElapsed() {
        if (this.elapsed > 0.3) {
            this.elapsed = 0;
        }
    }

    increaseElapsed(dt) {
        if (this.elapsed === undefined) {
            this.elapsed = dt;
        } else {
            this.elapsed += dt;
        }
    }

}















