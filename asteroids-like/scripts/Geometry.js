import { Draw } from "./Draw.js";
import { Helper } from "./helperFunctions.js";

export class Geometry {
    constructor(pos, sideNumber, radius) {
        this.angle = 0;
        this.pos = pos;
        this.sideNumber = sideNumber;
        this.offsets = new Array(this.sideNumber).fill(0);
        this.radius = radius;
        this.strokeStyle = "white";
        this.isColliding = false;
        this.rotationAngle = 0;
    }

    addOffsets() {
        const offsetArr = []
        for (let i = 0; i < this.sideNumber; i++) {
            offsetArr[i] = Helper.Math.Random.getRandomArbitrary(-10, 10);
        }
        return offsetArr;
    }

    update(dt) {
        this.move(dt)
        this.wrap();
    }

    draw(ctx) {
        ctx.save();
        Draw.canvasMethods.translateOriginToEntity(ctx, this);
        Draw.canvasMethods.rotateCanvasAroundEntity(ctx, this);
        Draw.Geometry.drawShape(ctx, this.points, this.strokeStyle);
        ctx.restore();
        Draw.Geometry.drawCircle(ctx, "red", 2, this.pos, this.hitboxRadius) //hitbox
    }
}