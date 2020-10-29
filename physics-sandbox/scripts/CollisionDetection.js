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
                    
                    if ((a * a + b * b ) < rad*rad) {
                        const x = physicsChildren[i].x - physicsChildren[j].x;
                        const y = physicsChildren[i].y - physicsChildren[j].y;
                        const length = Math.sqrt(x * x + y * y);
                        const overlap = Math.abs(length - physicsChildren[i].rad);
                        const vectors = this.normalize(x, y, length);

                        physicsChildren[i].x += overlap*vectors.x;
                        physicsChildren[j].x -= overlap*vectors.x;
                        
                        physicsChildren[i].y += overlap*vectors.y;
                        physicsChildren[j].y -= overlap*vectors.y;

/*                         physicsChildren[i].vx *= -0.8;
                        physicsChildren[j].vx *= -0.8;
                        physicsChildren[i].vy *= -0.8;
                        physicsChildren[j].vy *= -0.8; */
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

