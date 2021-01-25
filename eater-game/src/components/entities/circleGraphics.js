export class CircleGraphics extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(
            scene

        )
        this.entities = [];
    }

    update() {
        this.drawCircles();
    }

    drawCircles() {
        this.clear();
        for (let i = 0; i < this.entities.length; i++) {
            let entities = this.entities;

            this.lineStyle(5, entities[i].color, entities[i].alpha);
            this.fillStyle(entities[i].color, entities[i].alpha);

            this.beginPath();
            this.arc(entities[i].x, entities[i].y, entities[i].rad, 0, Math.PI * 2, false);


            this.closePath();
            this.strokePath();
            this.fillPath();
        }


    }

    addEntity(obj) {
        this.entities.push(obj);
        this.createTexture(obj);
    }

    createTexture(obj) {
        obj = this.entities[this.entities.indexOf(obj)];
        obj.image = this.generateTexture('playerGraphics');
    }

    destroyEntity(obj1, obj2) {

        let objIndex = this.entities.indexOf(obj2);
        this.entities.splice(objIndex, 1);
        obj2.destroy();
    }


}