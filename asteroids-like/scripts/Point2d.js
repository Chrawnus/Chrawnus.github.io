export class Point2d {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    translate(point) {
        this.x += point.x;
        this.y += point.y;
        return this;
    }
    //rotation around origin
    rotate(angle) {
        this.set(
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.x * Math.sin(angle) + this.y * Math.cos(angle)
        );
        return this;
    }
}
