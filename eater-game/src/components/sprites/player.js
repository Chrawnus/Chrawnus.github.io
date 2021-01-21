

export class Player extends Phaser.Physics.Arcade.Sprite {
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

        this.velocity = 8;
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false)
        this.setDamping(true)
        this.setDrag(0.000005);
    }

    update() {
        this.image.x = this.x;
        this.image.y = this.y;
        this.position = {x: this.x, y: this.y};
    }

    //create sprite out of playerGraphics and add it to this.image;
    addGraphicsObject(obj) {
        this.children.push(obj);
        this.createTexture();
    }

    createTexture() {
        let graphicsObj = this.children[0];
        graphicsObj.draw();
        this.image = graphicsObj.generateTexture('playerGraphics');
    }
}
