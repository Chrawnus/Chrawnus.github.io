import { Point2d } from "./Point2d.js";
import { keyArr } from "./KeyArr.js";

export class GeomHelper {
    constructor() {

    }

    static getLineSegmentMiddle(point1, point2) {
        const middleX = (point1.x + point2.x)/2;
        const middleY = (point1.y + point2.y)/2;

        return new Point2d(middleX, middleY);
    }

    static findClosestPointToMouse(mouseX, mouseY, geom) {
        let distance;
        let closest;
        for (let i = 0; i < geom.points.length; i++) {
            let point = geom.points[i];
            if (distance === undefined) {
                distance = Math.sqrt((point.x - mouseX) ** 2 + (point.y - mouseY) ** 2);
                closest = i; 
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
            return geom.points[closest];
        }
        
    }

    static getNewPoint(point, x, y, geom) {
        point = findClosestPointToMouse(x, y, geom);
        geom.getSelectedPoint(point);
        return point;
    }
}



