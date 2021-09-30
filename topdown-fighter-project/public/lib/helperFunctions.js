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

export function determineAttackDirection(entity1, entity2) {
    const x1 = entity1.x;
    const x2 = entity2.x;
    const y1 = entity1.y;
    const y2 = entity2.y;
    if (x2 > x1 - (entity1.width/2) && x2 < (x1 + entity1.width*1.5)) {
        if (y2 < y1) {
            return "Up"; 
        } else {
            return "Down";
        }
    }
    if (y2 > y1 - (entity1.height/2) && y2 < (y1 + entity1.height*1.5)) {
        if (x2 > x1) {
            return "Right"; 
        } else {
            return "Left";
        }
    }

    return 0;



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
