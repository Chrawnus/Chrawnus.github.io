import { PlayerGraphics } from "../sprites/playerGraphics.js";

export class Player extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, rad, color, alpha) {
        super(
            scene

        )
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color;
        this.alpha = alpha;
        this.draw();
        scene.physics.add.existing(this);
        



    }
    update() {

        
    }

    draw() {
        
        this.clear();
        this.lineStyle(5, this.color, 1.0);
        this.fillStyle(this.color, 1.0);

        this.beginPath();
        this.arc(0, 0, this.rad, 0, Math.PI*2, false);
        

        this.closePath();
        this.strokePath();
        this.fillPath();
        
    }

    
}
