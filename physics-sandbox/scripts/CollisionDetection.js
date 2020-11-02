import { ball1 } from "/physics-sandbox/scripts/app.js";
import { ball2 } from "/physics-sandbox/scripts/app.js";


export class Collision {
    constructor() {
        this.physicsChildren = [ball1, ball2];
    }


    physics(physicsChildren) {
        this.circleDetection(physicsChildren)

    }

    circleDetection(physicsChildren) {

        for (let i = 0; i < physicsChildren.length; i++) {
            for (let j = 0; j < i; j++) {
                if (i !== j) {
                    const a = physicsChildren[i].x - physicsChildren[j].x;
                    const b = physicsChildren[i].y - physicsChildren[j].y;
                    const rad = physicsChildren[i].rad + physicsChildren[j].rad;


                    if ((a * a + b * b) < rad * rad) {
                        const x = physicsChildren[i].x - physicsChildren[j].x;
                        const y = physicsChildren[i].y - physicsChildren[j].y;
                        const length = Math.sqrt(x * x + y * y);
                        const overlap = Math.abs(length - physicsChildren[i].rad);
                        const vectors = this.normalize(x, y, length);
                        let vRelativeVelocity = { x: physicsChildren[i].vx - physicsChildren[j].vx, y: physicsChildren[i].vy - physicsChildren[j].vy };
                        let speed = vRelativeVelocity.x * vectors.x + vRelativeVelocity.y * vectors.y;

                        physicsChildren[i].x += overlap * 0.5 * vectors.x;
                        physicsChildren[j].x -= overlap * 0.5 * vectors.x;

                        physicsChildren[i].y += overlap * 0.5 * vectors.y;
                        physicsChildren[j].y -= overlap * 0.5 * vectors.y;

                        
                        physicsChildren[i].vx -= (speed * vectors.x);
                        physicsChildren[i].vy -= (speed * vectors.y);
                        physicsChildren[j].vx += (speed * vectors.x);
                        physicsChildren[j].vy += (speed * vectors.y);
                    }
                }
            }
        }
    }

    normalize(x, y, length) {
        return {
            x: x / length,
            y: y / length
        };
    }
}

