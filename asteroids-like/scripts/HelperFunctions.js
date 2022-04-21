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
                const x1 = Math.floor(entity1.pos.x);
                const x2 = Math.floor(entity2.pos.x);
                const dx = x2 - x1
                return dx;
            }

            static getDeltaY(entity1, entity2) {
                const y1 = Math.floor(entity1.pos.y);
                const y2 = Math.floor(entity2.pos.y);
                const dy = y2 - y1
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
            static getAngleBetweenEntities(entity1, entity2) {
                const { dx, dy } = Helper.Math.Geometry.getDeltas(entity1, entity2);
                const angle = Math.atan2(dy, dx).toFixed(4);
                return angle;
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
        static isOutsideCanvas(canvas, entity) {
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
        
        static wrapTo(canvas, entity, boundary) {
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
    }
}




