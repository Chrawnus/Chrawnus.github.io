export class RigidBody {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.drag = 1;
        this.restitution = 0.8;
    }

    update(delta) {
        this.movement(delta);
    }

    movement(delta) {
        let distance = this.vy * delta;
        this.y += distance;

        this.x += this.vx * delta;
    }
}