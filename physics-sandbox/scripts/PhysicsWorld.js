import { canvasElem } from "/physics-sandbox/scripts/app.js";
import { keyArr } from "/physics-sandbox/scripts/app.js";

export class PhysicsWorld {
    constructor() {
        this.children = [];
        this.g = 9.81;
        this.drag = 1;

    }

    add(obj) {
        for (let i = 0; i < obj.length; i++) {
            this.children.push(obj[i]);
        }
    }

    physics(delta) {
        this.gravity(delta);
        this.collisionHandler();
    }

    gravity(delta) {

        for (let i = 0; i < this.children.length; i++) {
            const collision = this.collisionChecker(this.children[i]);
            if (!(this.children[i].y + this.children[i].rad >= canvasElem.height)) {
                this.g = 9.81;
            } else if (Math.abs(this.children[i].vy) < (this.g * this.g) || collision) {
                this.children[i].vy = 0;
            }
            //console.log(`Ball ${this.children.indexOf(i)} vy:${this.children[i].vy}`)
            this.children[i].vy += this.g;

            this.children[i].vx *= 1 - delta * this.children[i].drag * 0.01;

            if (this.children[i].speedMult > 50 * delta) {
                this.children[i].speedMult = 50 * delta;
            }
            if (this.children[i].gracePeriod > 0) {

                this.children[i].gracePeriod -= delta;

            }


            if (this.children[i].y + this.children[i].rad >= canvasElem.height) {
                if (this.children[i].y + this.children[i].rad > canvasElem.height) {
                    this.children[i].y = canvasElem.height - this.children[i].rad;
                    this.children[i].vy *= -this.children[i].restitution;
                    if (this.children[i].vy >= -this.g * 0.8) {
                        this.children[i].vy = 0;
                    }
                }



            }

            if (this.children[i].y - this.children[i].rad <= 0) {
                if (this.children[i].y - this.children[i].rad < 0) {
                    this.children[i].y = this.children[i].rad+1;
                }
                this.children[i].vy *= -this.children[i].restitution;

            }
            if (this.children[i].y + this.children[i].rad >= canvasElem.height) {
                if (this.children[i].y + this.children[i].rad > canvasElem.height) {
                    this.children[i].y = canvasElem.height - this.children[i].rad;
                }
                this.children[i].gracePeriod = delta * 8;
                this.children[i].vy *= -this.children[i].restitution;
            }

            if (this.children[i].x + this.children[i].rad >= canvasElem.width || this.children[i].x - this.children[i].rad <= 0) {
                if (this.children[i].x + this.children[i].rad > canvasElem.width) {
                    this.children[i].x = canvasElem.width - this.children[i].rad;
                }
                if (this.children[i].x - this.children[i].rad < 0) {
                    this.children[i].x = this.children[i].rad;
                }

                this.children[i].vx *= -this.children[i].restitution;

            }



            this.children[i].vx *= 1 - delta * this.children[i].drag;


            if (!(keyArr.includes("ArrowLeft")) != !(keyArr.includes("ArrowRight"))) {
                if (this.children[i].speedMult < delta * 450) {
                    this.children[i].speedMult += delta * 15;
                }
            }



        }

    }

    collisionChecker(children) {

        for (let i = 0; i < this.children.length; i++) {
            for (let j = 0; j < i; j++) {
                if (children !== j) {
                    const a = children.x - this.children[j].x;
                    const b = children.y - this.children[j].y;
                    const rad = children.rad + this.children[j].rad;

                    return ((a * a + b * b) < rad * rad);

                }
            }
        }
    }
    collisionHandler() {
        let children = this.children;

        for (let i = 0; i < children.length; i++) {
            for (let j = 0; j < i; j++) {
                if (i !== j) {
                    const a = children[i].x - children[j].x;
                    const b = children[i].y - children[j].y;
                    const rad = children[i].rad + children[j].rad;


                    if ((a * a + b * b) < rad * rad) {
                        const x = children[i].x - children[j].x;
                        const y = children[i].y - children[j].y;
                        const length = Math.sqrt(x * x + y * y);
                        const overlap = Math.abs(length - rad);

                        const vectors = length ? this.normalize(x, y, length) : { x: 0, y: -1 };



                        let vRelativeVelocity = { x: children[i].vx - children[j].vx, y: children[i].vy - children[j].vy };
                        let speed = vRelativeVelocity.x * vectors.x + vRelativeVelocity.y * vectors.y;


                        children[i].vx -= (speed * vectors.x);
                        children[j].vx += (speed * vectors.x);
                        children[i].vy -= (speed * vectors.y);
                        children[j].vy += (speed * vectors.y);


                    





                    children[i].x += overlap * 0.5 * vectors.x;
                    children[j].x -= overlap * 0.5 * vectors.x;
                    children[i].y += overlap * 0.5 * vectors.y;
                    children[j].y -= overlap * 0.5 * vectors.y;



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