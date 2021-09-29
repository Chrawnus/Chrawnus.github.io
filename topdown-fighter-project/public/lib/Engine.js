import { GameStateHandler } from "./GameStateHandler.js";
import { Pathfinding } from "./pathFinding.js";
import { Drawer } from "./Drawer.js";
import { UserInterface } from "./UserInterface.js";
import { getDelta, deltaVars } from "./helperFunctions.js";



export class Engine {
    constructor() {
        this.engine = this;
        this.drawer = new Drawer();
        this.UI = new UserInterface();
        this.gameStateHandler = new GameStateHandler();
        this.pathfinder = new Pathfinding();
        this.elapsed;
    }

    initialize() {
        const gameStateHandler = this.gameStateHandler;
        const UI = this.UI;
        gameStateHandler.initialize();
        UI.initializeMenuButtons(gameStateHandler.entities['player'], gameStateHandler.entities['enemy']);
    }

    start() {
        requestAnimationFrame(gameLoop.bind(this));

        function gameLoop(now) {
            requestAnimationFrame(gameLoop.bind(this));
    
            deltaVars.dt = getDelta(now);
            this.update(deltaVars.dt, now);
            this.draw();
        }
    }

    update(dt, now) {
        const UI = this.UI;
        const gameStateHandler = this.gameStateHandler;

        if (!UI.running) {
            return
        }
        if (gameStateHandler.checkEnemyState()) {
            gameStateHandler.entities['player'].onEnemyKill();
            gameStateHandler.entities['enemy'].boostStats();
            gameStateHandler.resetEnemyPos();
            UI.refreshUI(gameStateHandler.entities['player']);
        }
        if (gameStateHandler.gameOverCheck()) {
            gameStateHandler.onGameOver();
            UI.onGameOver(gameStateHandler.entities['player']);
        }
        gameStateHandler.getPlayerPosition();
        gameStateHandler.getEnemyPosition();

        gameStateHandler.entities['player'].update(dt, gameStateHandler);

        this.increaseElapsed(dt);
        this.refreshPathfinding();
        this.resetElapsed();

        gameStateHandler.entities['enemy'].update(dt, now, gameStateHandler);
    }

    draw() {
        this.drawer.draw(this.gameStateHandler.worldHandler, this.gameStateHandler.entities);
    }

    refreshPathfinding() {
        const gameStateHandler = this.gameStateHandler;
        const player = gameStateHandler.entities['player'];
        const enemy = gameStateHandler.entities['enemy'];
        const pathToPlayer = enemy.pathToPlayer;
        const floor = gameStateHandler.worldHandler.worldComponents[0];
        if (pathToPlayer === undefined || pathToPlayer.length === 0 || this.elapsed > 0.2) {
            enemy.pathToPlayer = this.pathfinder.update(floor[enemy.currentInhabitedTile], floor[player.currentInhabitedTile]);
            //this.elapsed = 0;
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















