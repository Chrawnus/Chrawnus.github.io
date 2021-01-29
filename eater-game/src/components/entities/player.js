export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, rad, color, alpha) {
        super(
            scene

        )
        this.image;
        this.position = { x: this.x, y: this.y };
        
        this.x = x;
        this.y = y;
        this.rad = rad;
        this.color = color;
        this.alpha = alpha;
        


        this.velocity = 4;
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        this.setDamping(true);
        this.setDrag(0.000005);
        this.setCircle(this.rad)

        this.health = 100;
    }

    update() {

        this.position = { x: this.x, y: this.y };
    }

    restoreHealth() {
        if (this.health < 100) {
            if (this.health > 95) {
                this.health = 100;
            } else {
                this.health += 5;
            }
        }
    }


}
