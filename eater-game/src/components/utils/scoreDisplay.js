export class Score extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, style) {
        super(scene, x, y, text, style);

        this.text = "Score: " + 0;
        scene.add.existing(this);
    }


    update(scoreNumber) {
        this.text = "Score: " + scoreNumber
    }
}

