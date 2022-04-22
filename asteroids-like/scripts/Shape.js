import { Helper } from "./HelperFunctions.js";
import { Point2d } from "./Point2d.js";

export class Shape {
    constructor(x, y, sideNumber, radius) {
        this.angle = 0;
        this.pos = new Point2d(x, y);
        this.sideNumber = sideNumber;
        this.offsets = new Array(this.sideNumber).fill(0);
        this.radius = radius;
        this.strokeStyle = "white";
        this.isColliding = false;
        this.rotationAngle = 0;
    }

    update(canvas, dt) {
        this.rotateShape(dt);
        this.wrap(canvas);
        this.move(dt);
    }

    move(dt) {
        this.pos.x += (this.speed * this.speedScaling * Math.cos(this.angle) * dt);
        this.pos.y += (this.speed * this.speedScaling * Math.sin(this.angle) * dt);
    }


    rotateShape(dt) {
        this.rotationAngle += this.rotationSpeed * dt;
    }

    addOffsets() {
        const offsetArr = []
        for (let i = 0; i < this.sideNumber; i++) {
            offsetArr[i] = Helper.Math.Random.getRandomArbitrary(-10, 10);
        }
        return offsetArr;
    }

    getVertexPoints() {
        const pArr = [];
        let angleTotal = Math.PI * 2;
        for (let i = 0; i < this.sideNumber; i++) {
            let angle = angleTotal * (i / this.sideNumber);
            const r = this.radius + this.offsets[i];
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            const point = new Point2d(x, y)
            pArr.push(point)
        }
        return pArr
    }

    isOutsideCanvas(canvas) {
        const isOutsideRightCanvasBoundary = this.pos.x > canvas.width + this.radius;
        const isOutsideLeftCanvasBoundary = this.pos.x < -this.radius;
        const isBelowCanvasBoundary = this.pos.y > canvas.height + this.radius;
        const isAboveCanvasBoundary = this.pos.y < -this.radius;
        if (isOutsideRightCanvasBoundary) {
            return "left";
        }
        if (isOutsideLeftCanvasBoundary) {
            return "right";
        }
        if (isBelowCanvasBoundary) {
            return "above";
        }
        if (isAboveCanvasBoundary) {
            return "below";
        }
    };

    wrap(canvas) {
        const wrapDestination = this.isOutsideCanvas(canvas)
        if (wrapDestination) {
            this.wrapTo(canvas, wrapDestination);
        }
    }

    wrapTo(canvas, boundary) {
        const leftOfCanvas = -this.radius;
        const RightOfCanvas = canvas.width + this.radius;
        const aboveCanvas = -this.radius;
        const belowCanvas = canvas.height + this.radius;
    
        if (boundary === "left") {
            this.pos.x = leftOfCanvas;
        } else if (boundary === "right") {
            this.pos.x = RightOfCanvas;
        }
        if (boundary === "above") {
            this.pos.y = aboveCanvas;
        } else if (boundary === "below") {
            this.pos.y = belowCanvas;
        }
    };

    killEntity(entities) {
        entities.splice(entities.indexOf(this), 1);
    }

    getDistanceToEntity(entity) {
        const { dx, dy } = this.getDeltas(entity);
        const distance = this.getDistance(dx, dy);
        return distance;
    }

    getDistance(deltaX, deltaY) {
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    getDeltas(entity) {
        const dx = this.getDeltaX(entity);
        const dy = this.getDeltaY(entity);
        return { dx, dy };
    }

    getDeltaX(entity) {
        const x1 = this.pos.x;
        const x2 = entity.pos.x;
        const dx = x2 - x1
        return dx;
    }

    getDeltaY(entity) {
        const y1 = this.pos.y;
        const y2 = entity.pos.y;
        const dy = y2 - y1
        return dy;
    }
}