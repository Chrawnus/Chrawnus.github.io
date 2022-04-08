import { Point2d } from "./Point2d.js";

export class Helper {
    constructor() {
        this.mouseC = new Point2d(0, 0);
        
    }
    static isMouseDown = false;


    getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect(), // abs. size of element
          scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
          scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
      
        
          this.mouseC.x = (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
          this.mouseC.y = (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
        }
      
    
    getRotationAngle(entity) {
        const angle = Math.atan2(this.mouseC.y - entity.pos.y, this.mouseC.x - entity.pos.x);
        return angle - (Math.PI/2);
    }
}

window.addEventListener('pointerdown', () => Helper.isMouseDown = true);
window.addEventListener('pointerup', () => Helper.isMouseDown = false);



