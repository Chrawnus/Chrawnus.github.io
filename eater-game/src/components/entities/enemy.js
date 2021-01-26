export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, rad, color, alpha) {
        super(
            scene

        )
        this.image;
        this.position;

        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color;
        this.alpha = alpha;

        this.velocity = 4;
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(false);
        this.body.setAllowGravity(false);
        this.setDamping(true);
        this.setDrag(0.000005);

        this.health = 1.0;
    }

    update() {

        this.position = { x: this.x, y: this.y };
    }
}
