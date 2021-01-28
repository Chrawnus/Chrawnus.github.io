export class PathHandler {
    constructor(rad, coords) {
        this.path = [];
        this.rad = rad;
        this.coords = coords;
        this.diff = [];
    }

    circleAround(target, obj, rad, coords) {
        if (rad === undefined) {
            rad = this.rad;
        }
        if (coords === undefined) {
            coords = this.coords;
        }

        const diff = this.diff;
        const path = this.path;

        if (path.length === 0) {
            for (let i = 0; i < this.coords; i++) {
                path.push({x: target.x + rad * Math.cos(2 * Math.PI * i / coords), y: target.y + rad * Math.sin(2 * Math.PI * i / coords)})
            }
        } else {
            for (let i = 0; i < path.length; i++) {
                path[i] = {x: target.x + diff[i].x, y: target.y + diff[i].y};
            }
        }

        obj.x = path[0].x;
        obj.y = path[0].y;

        if (diff.length > 0) {
            diff.length = 0;
        }
        this.getDiffCoords(target);
    }

    addCoord(X, Y) {
        this.path.push({x: X, y: Y});
    }

    removeCoord(X, Y) {
        const path = this.path;
        if (path.includes({x: X, y: Y})) {
            path.splice(path.indexOf({x: X, y: Y}));
        }
    }

    firstCoordtoLast() {
        const path = this.path;
        const diff = this.diff;
        if (path.length > 1) {
            path.push(path.shift());
            diff.push(diff.shift());
        }
    }

    getDiffCoords(target) {
        const path = this.path;
        const diff = this.diff;

        for (let i = 0; i < path.length; i++) {
            diff.push({x: path[i].x - target.x, y: path[i].y - target.y})
            
        }
    }

}

