export function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

export function rectsOverlaps(rect1, rect2) {

    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}


export function getDistanceBetweenPoints(x1, y1, x2, y2) {
    const a = x1 - x2;
    const b = y1 - y2;
    const dist = Math.sqrt(a * a + b * b);
    return dist;
}

export function intersectRect(rect1, rect2) {  
    return (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y)
}

export function getDelta(now) {
    if (!deltaVars.prevTime) { deltaVars.prevTime = now; }
    let dt = (now - deltaVars.prevTime) / 1000;
    deltaVars.prevTime = now;
    return dt;
}

export const deltaVars = {
    prevTime: undefined,
    dt: undefined
}