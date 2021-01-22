export class Pellets extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, rad, color, alpha) {
        super(
            scene

        )
        this.children = [];
        this.image;
        this.position;

        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color;
        this.alpha = alpha;

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.setDamping(true);
        this.setDrag(0.000005);
    }

    update() {

        this.position = {x: this.x, y: this.y};
    }

}