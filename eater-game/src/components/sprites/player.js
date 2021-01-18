

export class Player extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y) {
        super(scene, scene.x, scene.y, "player");
        this.x = x;
        this.y = y;
        scene.sys.displayList.add(this);
        scene.sys.updateList.add(this);
        
    }

    draw() {
        this.arc(this.x, this.y, 15, 0, Math.PI * 2, true);
    }
}