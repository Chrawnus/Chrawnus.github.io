import { Player } from "./Player.js";
import { Enemy } from "./Enemy.js";
import { GameStateHandler } from "./GameStateHandler.js";
import { Pathfinding } from "./pathFinding.js";
import { Drawer } from "./Drawer.js";
import { UserInterface } from "./UserInterface.js";
import { getDelta, deltaVars } from "./helperFunctions.js";
import { EntityHandler } from "./EntityHandler.js";
import { WorldHandler } from "./WorldHandler.js";



export class Engine {
    constructor() {
        this.engine = this;
        this.drawer = new Drawer();
        this.UI = new UserInterface();
        this.entityHandler = new EntityHandler();
        this.worldHandler = new WorldHandler();
        this.gameStateHandler = new GameStateHandler();

        this.pathfinder = new Pathfinding();
        this.elapsed;
    }

    initialize() {
        this.worldHandler.initialize();
        this.entityHandler.initialize(this.worldHandler, new Player('player', 0, 0, 32 * 0.8, 32 * 0.8, 'lime'), new Enemy('enemy', 640, 640, 32 * 0.8, 32 * 0.8, 'red'));
        const UI = this.UI;

        UI.initializeMenuButtons(this.entityHandler.entities['player'], this.entityHandler.entities['enemy']);
    }

    start() {
        requestAnimationFrame(gameLoop.bind(this));

        function gameLoop(now) {
            requestAnimationFrame(gameLoop.bind(this));
    
            deltaVars.dt = getDelta(now);
            this.update(deltaVars.dt);
            this.draw();
        }
    }

    update(dt) {
        const UI = this.UI;
        const entityHandler = this.entityHandler;
        const gameStateHandler = this.gameStateHandler;
        const worldHandler = this.worldHandler;
        if (!UI.running) {
            return
        }
        if (gameStateHandler.checkEnemyState(entityHandler)) {
            entityHandler.entities['player'].onEnemyKill();
            entityHandler.entities['enemy'].boostStats();
            entityHandler.resetEnemyPos();
            UI.refreshUI(entityHandler.entities['player']);
        }
        if (gameStateHandler.gameOverCheck(entityHandler)) {
            gameStateHandler.onGameOver();
            UI.onGameOver(entityHandler.entities['player']);
        }
        entityHandler.getPlayerPosition(worldHandler);
        entityHandler.getEnemyPosition(worldHandler);

        entityHandler.entities['player'].update(dt, entityHandler, worldHandler);

        this.increaseElapsed(dt);
        this.refreshPathfinding();
        this.resetElapsed();

        entityHandler.entities['enemy'].update(dt, entityHandler, worldHandler);
    }

    draw() {
        this.drawer.draw(this.worldHandler, this.entityHandler.entities);
    }

    refreshPathfinding() {
        const entityHandler = this.entityHandler;
        const player = entityHandler.entities['player'];
        const enemy = entityHandler.entities['enemy'];
        const pathToPlayer = enemy.pathToPlayer;
        const floor = this.worldHandler.worldComponents[0];
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















