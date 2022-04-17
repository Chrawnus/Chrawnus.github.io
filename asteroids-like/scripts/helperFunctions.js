import { CanvasClass } from "./Canvas.js";
import { Point2d } from "./Point2d.js";

export class Helper {
    static Movement = class {
        static wrap(entity) {
            const wrapDestination = isOutsideCanvas(entity)
            if (wrapDestination) {
                wrapTo(entity, wrapDestination);
            }
        }
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

        static isMouseDown = false;

        static getCursorPos(evt) {
            const rect = CanvasClass.canvas.getBoundingClientRect(), // abs. size of element
                scaleX = CanvasClass.canvas.width / rect.width,    // relationship bitmap vs. element for x
                scaleY = CanvasClass.canvas.height / rect.height;  // relationship bitmap vs. element for y
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
                return entity2.pos.x - entity1.pos.x;
            }

            static getDeltaY(entity1, entity2) {
                return entity2.pos.y - entity1.pos.y;
            }
        }
        static Trig = class {
            static getAngleBetweenEntities(entity1, entity2) {
                const { dx, dy } = Helper.Math.Geometry.getDeltas(entity1, entity2);
                return Math.atan2(dy, dx);
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
    }
}

window.addEventListener('pointerdown', () => Helper.Cursor.isMouseDown = true);
window.addEventListener('pointerup', () => Helper.Cursor.isMouseDown = false);

function isOutsideCanvas(entity) {
    const isOutsideRightCanvasBoundary = entity.pos.x > CanvasClass.canvas.width + entity.radius;
    const isOutsideLeftCanvasBoundary = entity.pos.x < -entity.radius;
    const isBelowCanvasBoundary = entity.pos.y > CanvasClass.canvas.height + entity.radius;
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

function wrapTo(entity, boundary) {
    const leftOfCanvas = -entity.radius;
    const RightOfCanvas = CanvasClass.canvas.width + entity.radius;
    const aboveCanvas = -entity.radius;
    const belowCanvas = CanvasClass.canvas.height + entity.radius;

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

window.addEventListener("mousemove", function (e) {
    Helper.Cursor.getCursorPos(e);
});
