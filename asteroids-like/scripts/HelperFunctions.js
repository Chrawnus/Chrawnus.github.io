import { Draw } from "./Draw.js";
import { Point2d } from "./Point2d.js";

export class Helper {
    static ArrayFunctions = class {
        /*
        remove method that is hopefully faster
        than splice by first swapping
        item at index with last item in array, then
        popping the item off the array.
        */
        static remove(index, array) {
            const lastIndex = array.length - 1;
            // if item is already last, nothing needs to be done, so just pop the item off the array.
            if (lastIndex === index) {
                array.pop();
                return array;
            } else {
                // swap item at index with last item in array.
                [array[index], array[lastIndex]] = [array[lastIndex], array[index]];
                // pop item from the array
                array.pop();
                return array;
            }
        }

    }
    static Movement = class {

        static getRotationAngle(entity) {
            const mouseCoord = Helper.Cursor.mouseC;
            return Helper.Math.Trig.getAngleBetweenEntities(entity, mouseCoord);
        }
    }

    static Cursor = class {
        static mouseC = {
            pos: {
                x: 0,
                y: 0
            }
        };

        static getCursorPos(evt) {
            const rect = Draw.Canvas.gameScreen.getBoundingClientRect(), // abs. size of element
                scaleX = Draw.Canvas.gameScreen.width / rect.width,    // relationship bitmap vs. element for x
                scaleY = Draw.Canvas.gameScreen.height / rect.height;  // relationship bitmap vs. element for y
            this.mouseC.pos.x = (evt.clientX - rect.left) * scaleX;
            this.mouseC.pos.y = (evt.clientY - rect.top) * scaleY;
        }

        static getX() {
            return this.mouseC.x;
        }

        static getY() {
            return this.mouseC.y;
        }
    }

    static Math = class {
        static Geometry = class {
            static deltaLookup = new Map();

            static getDistanceBetweenEntities(entity1, entity2) {
                const { dx, dy } = Helper.Math.Geometry.getDeltas(entity1, entity2);
                const distance = Helper.Math.Geometry.getDistance(dx, dy);
                return distance;
            }

            static getDistance(deltaX, deltaY) {
                return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            }

            static getDeltas(entity1, entity2) {
                const dx = this.getDeltaX(entity1, entity2);
                const dy = this.getDeltaY(entity1, entity2);
                return { dx, dy };
            }
            static getDeltaX(entity1, entity2) {
                const x1 = Math.floor(entity1.pos.x);
                const x2 = Math.floor(entity2.pos.x);
                const key = `${x1} . ${x2}`
                if (this.deltaLookup.has(key)) {
                    return this.deltaLookup.get(key);
                }
                const dx = x2 - x1
                this.deltaLookup.set(key, dx);
                return dx;
            }

            static getDeltaY(entity1, entity2) {
                const y1 = Math.floor(entity1.pos.y);
                const y2 = Math.floor(entity2.pos.y);
                const key = `${y1} . ${y2}`
                if (this.deltaLookup.has(key)) {
                    return this.deltaLookup.get(key);
                }
                const dy = y2 - y1
                this.deltaLookup.set(key, dy);
                return dy;
            }

            static RectCircleIntersects(circle, rect) {
                const distX = Math.abs(circle.pos.x - rect.pos.x - rect.width / 2);
                const distY = Math.abs(circle.pos.y - rect.pos.y - rect.height / 2);

                if (distX > (rect.width / 2 + circle.radius)) { return false; }
                if (distY > (rect.height / 2 + circle.radius)) { return false; }

                if (distX <= (rect.width / 2)) { return true; }
                if (distY <= (rect.height / 2)) { return true; }

                const dx = distX - rect.width / 2;
                const dy = distY - rect.height / 2;
                return (dx * dx + dy * dy <= (circle.radius * circle.radius));
            }
        }
        static Trig = class {
            static trigAngleLookup = new Map();

            static getAngleBetweenEntities(entity1, entity2) {
                const { dx, dy } = Helper.Math.Geometry.getDeltas(entity1, entity2);

                let trigKey;
                trigKey = Helper.Math.Trig.getTrigKey(dx, dy, trigKey);

                if (this.trigAngleLookup.has(trigKey)) {
                    return this.trigAngleLookup.get(trigKey);
                }
                const angle = Math.atan2(dy, dx).toFixed(4);
                this.trigAngleLookup.set(trigKey, angle);

                return angle;
            }

            static getTrigKey(dx, dy, key) {
                if (dx < 0 && dy < 0) {
                    key = `${(dy / dx).toFixed(4)}.bN`;
                }
                if (dx > 0 && dy < 0) {
                    key = `${(dy / dx).toFixed(4)}.xPyN`;
                }
                if (dx > 0 && dy > 0) {
                    key = `${(dy / dx).toFixed(4)}.xPyP`;
                }

                if (dx < 0 && dy > 0) {
                    key = `${(dy / dx).toFixed(4)}.xNyP`;
                }
                return key;
            }
        }

        static Random = class {
            static getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }
            static getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
            }
        }
    }

    static EntityMethods = class {
        //Determine the endpoint of a line given an angle, length,
        //and starting point [x, y]
        static getVertexPoints(entity) {
            const pArr = [];
            let angleTotal = Math.PI * 2;
            for (let i = 0; i < entity.sideNumber; i++) {
                let angle = angleTotal * (i / entity.sideNumber);
                const r = entity.radius + entity.offsets[i];
                const x = r * Math.cos(angle);
                const y = r * Math.sin(angle);
                const point = new Point2d(x, y)
                pArr.push(point)
            }
            return pArr
        }

        static isOutsideCanvas(entity) {
            const isOutsideRightCanvasBoundary = entity.pos.x > Draw.Canvas.gameScreen.width + entity.radius;
            const isOutsideLeftCanvasBoundary = entity.pos.x < -entity.radius;
            const isBelowCanvasBoundary = entity.pos.y > Draw.Canvas.gameScreen.height + entity.radius;
            const isAboveCanvasBoundary = entity.pos.y < -entity.radius;
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
        
        static wrapTo(entity, boundary) {
            const leftOfCanvas = -entity.radius;
            const RightOfCanvas = Draw.Canvas.gameScreen.width + entity.radius;
            const aboveCanvas = -entity.radius;
            const belowCanvas = Draw.Canvas.gameScreen.height + entity.radius;
        
            if (boundary === "left") {
                entity.pos.x = leftOfCanvas;
            } else if (boundary === "right") {
                entity.pos.x = RightOfCanvas;
            }
            if (boundary === "above") {
                entity.pos.y = aboveCanvas;
            } else if (boundary === "below") {
                entity.pos.y = belowCanvas;
            }
        };
    }
}



window.addEventListener("mousemove", function (e) {
    Helper.Cursor.getCursorPos(e);
});
