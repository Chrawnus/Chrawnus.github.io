import { Geometry } from "./Geometry.js";
import { Point2d } from "./Point2d.js";
import { Helper } from "./helperFunctions.js";
import { canvas } from "./Elements.js";
import { Vector } from "./Vector.js";

export class Asteroid extends Geometry {
    constructor(pos, sideNumber, radius, angle) {
        super(pos, sideNumber, radius);
        this.angle = angle;
        this.hitboxRadius = this.radius;
        this.offset = this.addOffsets();
        this.speed = Helper.Math.Random.getRandomArbitrary(150, 250);
        this.rotationSpeed = Helper.Math.Random.getRandomArbitrary((Math.PI*2*0.005) * -1, Math.PI*2*0.005);
        this.points = this.getVertexPoints();
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
        let angleTotal = Math.PI*2;
        for (let i = 0; i < this.sideNumber; i++) {
            let angle = angleTotal * (i/this.sideNumber);
            
            const r = this.radius + this.offset[i];
            const x = r * Math.cos(angle);
            const y = r * Math.sin(angle);
            const point = new Point2d(x, y)
            pArr.push(point)
        }
        return pArr
    }

    getVelocity() {
        const Vel = new Vector(this.pos.x + (Helper.getRandomArbitrary(-300, 300)), this.pos.y + (Helper.getRandomArbitrary(-300, 300)))
        return Vel;
    }


    update(dt) {
        this.move(dt)
        Helper.Movement.wrap(this, canvas)
    }

    draw(ctx) {
        let x = this.pos.x;
        let y = this.pos.y;

        ctx.save();
        ctx.translate(x, y)
        const points = this.points;
        
        this.rotateVertexArr(points)
        this.drawShape(ctx, points)
    
        ctx.restore();

    }

    rotateVertexArr(points) {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            point.rotate(this.rotationSpeed);
        }
    }

    move(dt) {
        this.pos.x += this.speed * Math.sin(this.angle) * dt;
        this.pos.y += this.speed * Math.cos(this.angle) * dt;
    }


}