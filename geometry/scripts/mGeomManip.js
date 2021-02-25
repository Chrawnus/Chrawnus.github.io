import { keyArr } from "./KeyArr.js";
import { geom } from "./geomObjects.js";

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