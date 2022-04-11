import { helper } from "./app.js";

export class Engine{
    constructor (canvas, physics)
    {
        this.canvas = canvas;
        this.physics = physics;
        this.entities = [];
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

