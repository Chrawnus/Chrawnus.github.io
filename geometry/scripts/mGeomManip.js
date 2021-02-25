import { keyArr } from "./KeyArr.js";
import { geom } from "./geomObjects.js";
import { Point2d } from "./Point2d.js";

export function findClosestPointToMouse(mouseX, mouseY, geom) {
    let distance;
    let closest;
    for (let i = 0; i < geom.points.length; i++) {
        let point = geom.points[i];
        if (distance === undefined) {
            distance = Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2);
            closest = i; point;
        } else {
            if (Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2) < distance) {
                distance = Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2);
                closest = i;
            }
        }
    }
    if (keyArr.includes("Shift")) {
        return [geom.points[closest], geom.points[closest + 1] || geom.points[0]];
    } else {
        return [geom.points[closest]];
    }
    
}
export function getNewPoint(point, x, y) {
    point = findClosestPointToMouse(x, y, geom);
    geom.getSelectedPoint(point);
    return point;
}

export function closestPoint(geom, point) {
    const lines = getPolygonLines(geom);
    const nearestLine = distanceToClosestLine(lines, point, undefined);
   
    const coord = getClosestPoint(point, nearestLine[0], nearestLine[1])
    return coord;
}

export function addNewPoint(geom, point) {
    
    const lines = getPolygonLines(geom);
    const nearestLine = distanceToClosestLine(lines, point, undefined);
   
    const coord = getClosestPoint(point, nearestLine[0], nearestLine[1])

    geom.points.splice(geom.points.indexOf(nearestLine[1]), 0, coord);
}

export function getPolygonLines(geom) {
    let lines = [];
    for (let i = 0; i < geom.points.length; i++) {
        if (i === geom.points.length - 1) {
            const startPoint = geom.points[i];
            const endPoint = geom.points[0];
            lines.push([startPoint, endPoint]);
        } else {
            const startPoint = geom.points[i];
            const endPoint = geom.points[i+1];
            lines.push([startPoint, endPoint]);
        }
        
        
    }
    return lines;
}

function distanceToClosestLine(lines, cC, distance) {
    let index;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const A = (line[1].x - line[0].x) * (line[0].y - cC.y);
        const B = (line[0].x - cC.x) * (line[1].y - line[0].y);
        const denominator = Math.abs(A - B);
        const numerator = Math.sqrt((line[1].x - line[0].x) ** 2 + (line[1].y - line[0].y) ** 2);
        if (distance === undefined) {
            distance = denominator / numerator;
            index = i;
        } else if ((denominator / numerator < distance)) {
            distance = denominator / numerator;
            index = i;
        }
    }

    return lines[index];
}


function getCoordFromAngle(x, y, length, externalAngle) {

    let x2 = length * (Math.sin(externalAngle));
    let y2 = Math.sqrt((length) ** 2 - (x2 ** 2));
    if (externalAngle > 90 && externalAngle < 180) {
        return new Point2d(x + x2, y - y2);
    } else if (externalAngle >= 180 && externalAngle < 270) {
        return new Point2d(x + x2, y - y2);
    } else if (externalAngle > 270 && externalAngle < 360) {
        return new Point2d(x + x2, y + y2);
    } else {
        return new Point2d(x + x2, y + y2);
    }
}


function getClosestPoint( mousePos, lineStart, lineEnd) {
    const atob = new Point2d(lineEnd.x - lineStart.x, lineEnd.y - lineStart.y);
    const atop = new Point2d(mousePos.x - lineStart.x, mousePos.y - lineStart.y);

    const len = atob.x * atob.x + atob.y * atob.y;
    let dot = atop.x * atob.x + atop.y * atob.y;
    let t = Math.min( 1, Math.max( 0, dot / len ) );

    dot = ( lineEnd.x - lineStart.x ) * ( mousePos.y - lineStart.y ) - ( lineEnd.y - lineStart.y ) * ( mousePos.x - lineStart.x );
    
    return new Point2d(lineStart.x + atob.x * t, lineStart.y + atob.y * t)
}
