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

    // move entity in the direction of [this.angle], 
    // with a speed of [this.speed] scaled with [this.speedScaling];  
    move(dt) {
        this.pos.x += (this.speed * this.speedScaling * Math.cos(this.angle) * dt);
        this.pos.y += (this.speed * this.speedScaling * Math.sin(this.angle) * dt);
    }

    // updates rotation angle
    rotateShape(dt) {
        this.rotationAngle += this.rotationSpeed * dt;
    }

    // creates an array of values by which to offset the 
    // distance from the center point of the shape to the vertices, 
    // in order to create "asteroid-looking" shapes. 
    addOffsets() {
        const offsetArr = []

        // create [this.sideNumber] number of random values between 
        // -10 and 10 and add them to offsetArr.
        for (let i = 0; i < this.sideNumber; i++) {
            offsetArr[i] = Helper.Math.Random.getRandomArbitrary(-10, 10);
        }
        return offsetArr;
    }

    /* 
    function that creates an array of vertex points
    for drawing the shape on screen
    */
    getVertexPoints() {
        const pArr = [];
        let angleTotal = Math.PI * 2; //360°

        // create [this.sideNumber] amount of vertex
        // points. 
        for (let i = 0; i < this.sideNumber; i++) {
            // divide up angleTotal in [this.sideNumber]
            // number of equal angles, and give the [i]th angle. 
            let angle = (angleTotal / this.sideNumber) * (i);

            // offset current vertex distance from [this.radius]
            // by [this.offsets[i]].
            const r = this.radius + this.offsets[i];

            // get position of current vertex.
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);

            // create new Point2D object with position (x, y).
            const point = new Point2d(x, y)

            // push point to vertex array.
            pArr.push(point)
        }
        return pArr
    }

    /*
    function that checks whether the shape is outside
    of any of the canvas edges and returns a string value
    representing which edge of the canvas the shape should
    wrap to.
    */
    getWrapDestination(canvas) {
        const isOutsideRightCanvasEdge = this.pos.x > canvas.width + this.radius;
        const isOutsideLeftCanvasEdge = this.pos.x < -this.radius;
        const isBelowCanvasEdge = this.pos.y > canvas.height + this.radius;
        const isAboveCanvasEdge = this.pos.y < -this.radius;

        // return which canvas edge the shape should wrap to
        // depending on which edge it's outside of. 
        if (isOutsideRightCanvasEdge) {
            return "left";
        }
        if (isOutsideLeftCanvasEdge) {
            return "right";
        }
        if (isBelowCanvasEdge) {
            return "above";
        }
        if (isAboveCanvasEdge) {
            return "below";
        }
    };

    /*
    wraps the shape to the opposite edge of the canvas
    when it goes outside of the canvas.
    */
    wrap(canvas) {
        // get the wrapDestination
        const wrapDestination = this.getWrapDestination(canvas)
        // if wrapDestination is not undefined, move shape to wrapDestination.
        if (wrapDestination) {
            this.wrapTo(canvas, wrapDestination);
        }
    }

    /*
    moves the shape to a given edge of the canvas
    */
    wrapTo(canvas, edge) {
        const leftOfCanvas = -this.radius;
        const RightOfCanvas = canvas.width + this.radius;
        const aboveCanvas = -this.radius;
        const belowCanvas = canvas.height + this.radius;

        if (edge === "left") {
            this.pos.x = leftOfCanvas;
        } else if (edge === "right") {
            this.pos.x = RightOfCanvas;
        }
        if (edge === "above") {
            this.pos.y = aboveCanvas;
        } else if (edge === "below") {
            this.pos.y = belowCanvas;
        }
    };

    /*
    removes the entity from the engine
    */
    killEntity(entities) {
        entities.splice(entities.indexOf(this), 1);
    }

    /*
    get the distance to an entity from the 
    center point of the shape.
    */
    getDistanceToEntity(entity) {
        // get delta values
        const { dx, dy } = this.getDeltas(entity);

        // get the distance
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

    /*
    pushback function that makes sure entities do not
    clip through each other when colliding. 
    */
    pushback(entity1, entity2) {
        let { dx, dy } = entity1.getDeltas(entity2);
        const length = entity1.getDistanceToEntity(entity2);
        const step = entity1.radius + entity2.radius - length;
        if (step > 0) {
            dx /= length; dy /= length;
            entity1.pos.x -= dx * step / 2; entity1.pos.y -= dy * step / 2;
            entity2.pos.x += dx * step / 2; entity2.pos.y += dy * step / 2;
        }
    }
}