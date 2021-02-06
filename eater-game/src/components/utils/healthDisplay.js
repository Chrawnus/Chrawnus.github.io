export class Health extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style, health) {
        super(scene, x, y, text, style);

        this.text = "Health: " + health;
        scene.add.existing(this);
    }


    update(health) {
        this.text = "Health: " + health;
    }
}