export class PathHandler {
    constructor(rad, coords) {
        this.path = [];
        this.rad = rad;
        this.coords = coords;
    }

    circleAround(target, obj, rad, coords) {
        if (rad === undefined) {
            rad = this.rad;
        }
        if (coords === undefined) {
            coords = this.coords;
        }

        let path = this.path;
        for (let i = 0; i < this.coords; i++) {
            path.push({x: target.x + rad * Math.cos(2 * Math.PI * i / coords), y: target.y + rad * Math.sin(2 * Math.PI * i / coords)})
        }

        obj.x = path[0].x;
        obj.y = path[0].y;
    }

    addCoord(X, Y) {
        this.path.push({x: X, y: Y});
    }

    removeCoord(X, Y) {
        let path = this.path;
        if (path.includes({x: X, y: Y})) {
            path.splice(path.indexOf({x: X, y: Y}));
        }
    }

    firstCoordtoLast() {
        let path = this.path;
        if (path.length > 1) {
            path.push(path.shift());
        }
    }
}

