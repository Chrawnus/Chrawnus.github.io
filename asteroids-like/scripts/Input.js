/*
Class for handling input related events.
*/
export class Input {
    constructor() {

        // Holds key-value pairs representing
        // keys on the keyboard and whether they're
        //currently being held down or not.
        this.keyInputObject = {
            "KeyP": false
        };
        

        // Holds key-value pairs representing
        // buttons on the mouse and whether they're
        // currently being pressed or not.
        this.mouseInputObject = {
            "0": false,             // left mouse button
            "1": false,             // middle mouse button
            "2": false,             // right mouse button
            "3": false,             // back side button
            "4": false              // forward side button
        }

        /*
        Class for handling events related to 
        the cursor and it's position on canvas.
        */
        this.Cursor = class {
            // Mouse position object
            static mouseC = {
                pos: {
                    x: 0,
                    y: 0
                }
            };
            

            /*
            Updates the x and y values of the
            mouse position object.
            */
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