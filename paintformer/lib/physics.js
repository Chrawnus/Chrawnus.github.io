export function moveCollideX(distanceX, rect, collisionRects, collisionCallback) {
    rect.x += distanceX;

    for (let i = 0; i < collisionRects.length; i++) {
        const colObj = collisionRects[i];

        if (rectsOverlaps(rect, colObj)) {

            if (collisionCallback) {
                if(!collisionCallback(rect, colObj)) {
                    continue;
                }
            }

            const collisionOffset = rect.x + rect.width / 2 < colObj.x + colObj.width / 2
                ? rect.x + rect.width - colObj.x
                : rect.x - (colObj.x + colObj.width)
            rect.x -= collisionOffset;
            colObj.color = 'magenta';
        }
    }
}

export function moveCollideY(distanceY, rect, collisionRects, collisionCallback) {
    rect.y += distanceY;

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
            colObj.color = 'magenta';
            rect.jumpStrength = -6.2;
        }
    }
}

export function rectsOverlaps(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

