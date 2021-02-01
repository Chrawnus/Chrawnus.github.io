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

        this.timesHealthUpgraded = 0;
        this.healthPelletsCollected = 0;
        this.healthPelletsToUpgrade = 5;
        this.maxHealth = 100;
        this.health = 100;
    }

    update() {

        this.position = { x: this.x, y: this.y };
    }

    restoreHealth() {
        if (this.health === this.maxHealth) {
            this.healthPelletsCollected += 1;
            if (this.healthPelletsCollected >= this.healthPelletsToUpgrade) {
                this.maxHealth = Math.round(this.maxHealth*1.05);
                this.healthPelletsToUpgrade = Math.ceil(this.healthPelletsToUpgrade*1.125);
                console.log(this.healthPelletsToUpgrade);
            }
        }
        if (this.health < this.maxHealth) {
            if (this.health > this.maxHealth*0.95) {
                this.health = this.maxHealth;
            } else {
                this.health += this.maxHealth*0.05;
            }
        }
    }


}
