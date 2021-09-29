import { rectsOverlaps } from "./helperFunctions.js";

export function moveCollideX(distanceX, rect, collisionRects, collisionCallback) {
    rect.x += distanceX;

    if (Array.isArray(collisionRects)) {
        for (let i = 0; i < collisionRects.length; i++) {
            const colObj = collisionRects[i];

            if (rectsOverlaps(rect, colObj)) {

                if (collisionCallback) {
                    if (!collisionCallback(rect, colObj)) {
                        continue;
                    }
                }

                const collisionOffset = rect.x + rect.width / 2 < colObj.x + colObj.width / 2
                    ? rect.x + rect.width - colObj.x
                    : rect.x - (colObj.x + colObj.width)
                rect.x -= collisionOffset;
            }
        }
    } else {
        if (rect === collisionRects) {
            return;
        }
        const colObj = collisionRects;

        if (rectsOverlaps(rect, colObj)) {

            if (collisionCallback) {
                if (!collisionCallback(rect, colObj)) {
                    return;
                }
            }

            const collisionOffset = rect.x + rect.width / 2 < colObj.x + colObj.width / 2
                ? rect.x + rect.width - colObj.x
                : rect.x - (colObj.x + colObj.width)
            rect.x -= collisionOffset;
        }
    }
}

export function moveCollideY(distanceY, rect, collisionRects, collisionCallback) {
    rect.y += distanceY;

    if (Array.isArray(collisionRects)) {
        for (let i = 0; i < collisionRects.length; i++) {
            const colObj = collisionRects[i];

            if (rectsOverlaps(rect, colObj)) {

                if (collisionCallback) {
                    collisionCallback(rect, colObj);
                }

                const collisionOffset = rect.y + rect.height / 2 < colObj.y + colObj.height / 2
                    ? rect.y + rect.height - colObj.y
                    : rect.y - (colObj.y + colObj.height)
                rect.y -= collisionOffset;
            }
        }
    } else {
        if (rect === collisionRects) {
            return;
        }
        const colObj = collisionRects;

        if (rectsOverlaps(rect, colObj)) {

            if (collisionCallback) {
                collisionCallback(rect, colObj);
            }

            const collisionOffset = rect.y + rect.height / 2 < colObj.y + colObj.height / 2
                ? rect.y + rect.height - colObj.y
                : rect.y - (colObj.y + colObj.height)
            rect.y -= collisionOffset;
        }
    }
}



