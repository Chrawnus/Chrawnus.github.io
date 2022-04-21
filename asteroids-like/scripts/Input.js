export class Input {
    constructor() {
        this.keyInputObject = {
            "KeyP": false
        };
    
        this.mouseInputObject = {
            "0": false,             // left mouse button
            "1": false,             // middle mouse button
            "2": false,             // right mouse button
            "3": false,             // back side button
            "4": false              // forward side button
        }
        this.Cursor = class {
            static mouseC = {
                pos: {
                    x: 0,
                    y: 0
                }
            };
    
            static getCursorPos(evt, engine) {
                const rect = engine.canvas.getBoundingClientRect(), // abs. size of element
                    scaleX = engine.canvas.width / rect.width,    // relationship bitmap vs. element for x
                    scaleY = engine.canvas.height / rect.height;  // relationship bitmap vs. element for y
                this.mouseC.pos.x = (evt.clientX - rect.left) * scaleX;
                this.mouseC.pos.y = (evt.clientY - rect.top) * scaleY;
            }
    
            static getX() {
                return this.mouseC.x;
            }
    
            static getY() {
                return this.mouseC.y;
            }
        }
    }
}