import { canvasElem, keyArr } from "./app.js";

export class PhysicsWorld {
    constructor() {
        this.children = [];
        this.g = 9.81;
        this.drag = 0.1;
        this.rho = 1.22;
        this.collisionSectors = {
            "sector1": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": 0 },
            "sector2": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": 0 },
            "sector3": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": 0 },
            "sector4": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": 0 },
            "sector5": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) },
            "sector6": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) },
            "sector7": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) },
            "sector8": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) },
            "sector9": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) * 2 },
            "sector10": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) * 2 },
            "sector11": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) * 2 },
            "sector12": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) * 2 },
            "sector13": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": 0, "y": (canvasElem.height / 4) * 3 },
            "sector14": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4), "y": (canvasElem.height / 4) * 3 },
            "sector15": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 2, "y": (canvasElem.height / 4) * 3 },
            "sector16": { "width": canvasElem.width / 4, "height": canvasElem.height / 4, "x": (canvasElem.width / 4) * 3, "y": (canvasElem.height / 4) * 3 },
        }

        this.collisionSectorsTest = {
            "sector1": {"width": canvasElem.width/2, "height": canvasElem.height/2, "x": 0, "y": 0},
            "sector2": {"width": canvasElem.width/2, "height": canvasElem.height/2, "x": (canvasElem.width/2), "y": 0},
            "sector3": {"width": canvasElem.width/2, "height": canvasElem.height/2, "x": 0, "y": canvasElem.height/2},
            "sector4": {"width": canvasElem.width/2, "height": canvasElem.height/2, "x": (canvasElem.width/2)*3, "y": canvasElem.height/2},
           
        }

        this.collisionGroups = {
            "sector1": [],
            "sector2": [],
            "sector3": [],
            "sector4": [],
            "sector5": [],
            "sector6": [],
            "sector7": [],
            "sector8": [],
            "sector9": [],
            "sector10": [],
            "sector11": [],
            "sector12": [],
            "sector13": [],
            "sector14": [],
            "sector15": [],
            "sector16": [],
        }
    }

    add(obj) {
        for (let i = 0; i < obj.length; i++) {
            this.children.push(obj[i]);
        }
    }



    physics(delta) {
        this.gravity(delta);
        this.collisionHandler(delta);
    }

    gravity(delta) {
        for (let i = 0; i < this.children.length; i++) {





            //if (this.children[i].isAwake) {

                let Fx = -0.5 * this.children[i].Cd * this.children[i].A * this.rho * this.children[i].vx * this.children[i].vx * this.children[i].vx / Math.abs(this.children[i].vx);
                let Fy = -0.5 * this.children[i].Cd * this.children[i].A * this.rho * this.children[i].vy * this.children[i].vy * this.children[i].vy / Math.abs(this.children[i].vy);


                Fx = (isNaN(Fx) ? 0 : Fx);
                Fy = (isNaN(Fy) ? 0 : Fy);

                let ax = Fx / this.children[i].mass;
                let ay = this.g + (Fy / this.children[i].mass);

                if (!(this.children[i].y + this.children[i].rad >= canvasElem.height)) {
                    this.g = 9.81;
                } else if (Math.abs(this.children[i].vy) < (this.g * this.g)) {
                    this.children[i].vy = 0;
                }
                this.children[i].vy += ay;
                this.children[i].vx += ax;



                if (this.children[i].speedMult > 50 * delta) {
                    this.children[i].speedMult = 50 * delta;
                }
                if (this.children[i].gracePeriod > 0) {

                    this.children[i].gracePeriod -= delta;

                }


                if (this.children[i].y >= canvasElem.height - this.children[i].rad) {
                    this.children[i].vy *= this.children[i].restitution;
                    this.children[i].y = canvasElem.height - this.children[i].rad;
                    this.children[i].gracePeriod = delta * 8;
                }
                if (this.children[i].x > canvasElem.width - this.children[i].rad) {
                    this.children[i].vx *= this.children[i].restitution;
                    this.children[i].x = canvasElem.width - this.children[i].rad;
                    this.children[i].speedMult = 1;
                }
                if (this.children[i].x < this.children[i].rad) {
                    this.children[i].vx *= this.children[i].restitution;
                    this.children[i].x = this.children[i].rad;
                    this.children[i].speedMult = 1;
                }

                this.children[i].vx *= 1 - delta * this.children[i].drag;


                if (!(keyArr.includes("ArrowLeft")) != !(keyArr.includes("ArrowRight"))) {
                    if (this.children[i].speedMult < delta * 450) {
                        this.children[i].speedMult += delta * 15;
                    }
                }
/*             } else {
                if (this.children[i].y >= canvasElem.height - this.children[i].rad) {
                    this.children[i].vy *= this.children[i].restitution;
                    this.children[i].y = canvasElem.height - this.children[i].rad;
                    this.children[i].gracePeriod = delta * 8;
                }
                if (this.children[i].x > canvasElem.width - this.children[i].rad) {
                    this.children[i].vx *= this.children[i].restitution;
                    this.children[i].x = canvasElem.width - this.children[i].rad;
                    this.children[i].speedMult = 1;
                }
                if (this.children[i].x < this.children[i].rad) {
                    this.children[i].vx *= this.children[i].restitution;
                    this.children[i].x = this.children[i].rad;
                    this.children[i].speedMult = 1;
                }
            } */
        }

    }

    RectCircleColliding(circle, rect) {
        const distX = Math.abs(circle.x - rect.x - rect.width / 2);
        const distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > (rect.width / 2 + circle.rad)) { return false; }
        if (distY > (rect.height / 2 + circle.rad)) { return false; }

        if (distX <= (rect.width / 2)) { return true; }
        if (distY <= (rect.height / 2)) { return true; }

        const dx = distX - rect.width / 2;
        const dy = distY - rect.height / 2;
        return (dx * dx + dy * dy <= (circle.rad * circle.rad));
    }


    collisionHandler(delta) {
        let groups = this.collisionGroupChecker();

        groups.forEach((key) => {
            for (let i = 0; i < this.collisionGroups[key].length; i++) {
                for (let j = 0; j < i; j++) {

                    if (i !== j) {
                        const a = this.collisionGroups[key][i].x - this.collisionGroups[key][j].x;
                        const b = this.collisionGroups[key][i].y - this.collisionGroups[key][j].y;
                        const rad = this.collisionGroups[key][i].rad + this.collisionGroups[key][j].rad;


                        if ((a * a + b * b) < rad * rad) {
                            this.collisionGroups[key][i].gracePeriod = delta * 8;
                            this.collisionGroups[key][i].gracePeriod = delta * 8;
                            const x = this.collisionGroups[key][i].x - this.collisionGroups[key][j].x;
                            const y = this.collisionGroups[key][i].y - this.collisionGroups[key][j].y;
                            const length = Math.sqrt(x * x + y * y)
                            //? Math.sqrt(x * x + y * y) : 1;


                            const a1 = (2 * length) ? (this.collisionGroups[key][i].rad ** 2 - this.collisionGroups[key][j].rad ** 2 + length * length) / (2 * length) : 0;


                            const b1 = (2 * length) ? (this.collisionGroups[key][j].rad ** 2 - this.collisionGroups[key][i].rad ** 2 + length * length) / (2 * length) : 0;


                            const d1 = (a1 - this.collisionGroups[key][j].rad);
                            const d2 = (b1 - this.collisionGroups[key][i].rad);

                            const overlap = Math.abs(d1 + d2);

                            const intersectLength1 = Math.abs(a1 - d1);
                            const intersectLength2 = Math.abs(b1 - d2);

                            const pushPercentage1 = Math.abs(d1 / intersectLength1);
                            const pushPercentage2 = Math.abs(d2 / intersectLength2);


                            const vectors = length ? this.normalize(x, y, length) : { x: 0, y: -1 };

                            let vRelativeVelocity = { x: this.collisionGroups[key][i].vx - this.collisionGroups[key][j].vx, y: this.collisionGroups[key][i].vy - this.collisionGroups[key][j].vy };
                            let speed = vRelativeVelocity.x * vectors.x + vRelativeVelocity.y * vectors.y;
                            let impulse = (2 * speed / (this.collisionGroups[key][i].mass + this.collisionGroups[key][j].mass));


                            if (this.collisionGroups[key][i].isAwake) {
                                this.collisionGroups[key][i].vx -= (impulse * this.collisionGroups[key][j].mass * vectors.x) * 0.985;
                                this.collisionGroups[key][i].vy -= (impulse * this.collisionGroups[key][j].mass * vectors.y) * 0.985;
                            }

                            if (this.collisionGroups[key][j].isAwake) {
                                this.collisionGroups[key][j].vx += (impulse * this.collisionGroups[key][i].mass * vectors.x) * 0.98;
                                this.collisionGroups[key][j].vy += (impulse * this.collisionGroups[key][i].mass * vectors.y) * 0.98;
                            }





                            this.collisionGroups[key][i].x += overlap * pushPercentage2 * vectors.x;
                            this.collisionGroups[key][i].y += overlap * pushPercentage2 * vectors.y;



                            this.collisionGroups[key][j].x -= overlap * pushPercentage1 * vectors.x;
                            this.collisionGroups[key][j].y -= overlap * pushPercentage1 * vectors.y;







                        }

                    }
                }
            }
        });
    }

    collisionGroupChecker() {
        let children = this.children;
        let sectors = Object.keys(this.collisionSectors);
        let groups = Object.keys(this.collisionGroups);

        sectors.forEach((key) => {
            for (let i = 0; i < children.length; i++) {
                if (!(this.collisionGroups[key].includes(children[i]))) {
                    if (this.RectCircleColliding(children[i], this.collisionSectors[key])) {
                        this.collisionGroups[key].push(children[i]);
                    }
                } else if (!(this.RectCircleColliding(children[i], this.collisionSectors[key]))) {
                    this.collisionGroups[key].splice(this.collisionGroups[key].indexOf(children[i]), 1);
                }

            }
        });
        return groups;
    }

    normalize(x, y, length) {
        return {
            x: x / length,
            y: y / length
        };
    }


}