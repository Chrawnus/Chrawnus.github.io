import { helper } from "./app.js";

export class Engine{
    constructor (canvas, physics)
    {
        this.canvas = canvas;
        this.physics = physics;
    }

    start() {
        requestAnimationFrame(gameLoop.bind(this));

        function gameLoop(now) {
            requestAnimationFrame(gameLoop.bind(this));
    
            
            this.physics.update(now, helper.mouseC);
            this.canvas.draw();
        }
    }

    addEntity(entity) {
        this.canvas.addEntity(entity);
        this.physics.addEntity(entity);
    }
}

