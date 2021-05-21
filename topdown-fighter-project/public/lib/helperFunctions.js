export function intersectingRect(r1, r2) {
    var x = Math.max(r1.x, r2.x);
    var y = Math.max(r1.y, r2.y);
    var xx = Math.min(r1.x + r1.width, r2.x + r2.width);
    var yy = Math.min(r1.y + r1.height, r2.y + r2.height);
    return ({ x: x, y: y, width: xx - x, height: yy - y });
}

export function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

export function rectanglesIntersect(rect, view) {
    const aLeftOfB = rect.x + rect.width < view.x;
    const aRightOfB = rect.x > view.x + view.width;
    const aAboveB = rect.y > view.y + view.height;
    const aBelowB = rect.y + rect.height < view.y;

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
}

export function rectsOverlaps(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

export function getEntityPosOnTileGrid(entity, tileGrid) {
    
    for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];
        if ((entity.x + entity.width / 2 > tile.x &&
            entity.x + entity.width / 2 < tile.x + tile.width &&
            entity.y + entity.height / 2 > tile.y &&
            entity.y + entity.height / 2 < tile.y + tile.height)) {
            entity.currentInhabitedTile = i;

        }
    }
}

export function getDistanceBetweenPoints(x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;

    const dist = Math.sqrt(a*a + b*b);
    return dist;
}