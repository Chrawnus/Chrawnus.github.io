import { Point2d } from "./Point2d.js";
import { canvas } from "./Elements.js";


export class Helper {
    constructor() {
        
    }

    static Movement = class {
        static wrap(entity, canvas) {

            const wrapDestination = isOutsideCanvas(entity, canvas)

            if (wrapDestination) {
                wrapTo(entity, canvas, wrapDestination);
            }

        }

        static moveTowardsCursor(dt, entity) {

            const mouseCoord = Helper.Cursor.mouseC;

            const dx = Helper.Math.Geometry.getDeltaX(entity.pos, mouseCoord);
            const dy = Helper.Math.Geometry.getDeltaY(entity.pos, mouseCoord);
            
            const distance = Helper.Math.Geometry.getDistance(dx, dy);

            const angle = Helper.Math.Trig.getAngleBetweenPoints(entity.pos, mouseCoord);


            entity.pos.x += distance * 1.5 * Math.sin(angle) * dt;
            entity.pos.y += distance * 1.5 * Math.cos(angle) * dt;
        }

        static getRotationAngle(entity) {
            const mouseCoord = Helper.Cursor.mouseC;

            const dx = Helper.Math.Geometry.getDeltaX(entity.pos, mouseCoord);
            const dy = Helper.Math.Geometry.getDeltaY(entity.pos, mouseCoord);
            const angle = Math.atan2(dy, dx);

            return angle;
        }
    }

    static Cursor = class {
        static mouseC = new Point2d(0, 0);
        static isMouseDown = false;

        static getCursorPos(canvas, evt) {
            const rect = canvas.getBoundingClientRect(), // abs. size of element
                scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
                scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
            
            this.mouseC.x = (evt.clientX - rect.left) * scaleX;
            this.mouseC.y = (evt.clientY - rect.top) * scaleY;
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
            static getDistance(deltaX, deltaY) {
                return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            }

            static getDeltaX(point1, point2) {
                return point2.x - point1.x;
            }

            static getDeltaY(point1, point2) {
                return point2.y - point1.y;
            }
        }
        static Trig = class {
             static getAngleBetweenPoints(point1, point2) {
                const dx = Helper.Math.Geometry.getDeltaX(point1, point2);
                const dy = Helper.Math.Geometry.getDeltaY(point1, point2);
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


}

window.addEventListener('pointerdown', () => Helper.Cursor.isMouseDown = true);
window.addEventListener('pointerup', () => Helper.Cursor.isMouseDown = false);




function isOutsideCanvas(entity, canvas) {
    const isOutsideRightCanvasBoundary = entity.pos.x > canvas.width + entity.radius;
    const isOutsideLeftCanvasBoundary = entity.pos.x < -entity.radius;
    const isBelowCanvasBoundary = entity.pos.y > canvas.height + entity.radius;
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

function wrapTo(entity, canvas, boundary) {
    const leftOfCanvas = -entity.radius;
    const RightOfCanvas = canvas.width + entity.radius;
    const aboveCanvas = -entity.radius;
    const belowCanvas = canvas.height + entity.radius;

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
    Helper.Cursor.getCursorPos(canvas, e);

});
