import { Point2d } from "./Point2d.js";

export class GeomHelper {
    constructor() {

    }

    static getLineSegmentMiddle(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const ratio = dx/dy;
        const distance = Math.sqrt(dx**2 + dy**2);
        
        return new Point2d(middleX, middleY);
    }
}