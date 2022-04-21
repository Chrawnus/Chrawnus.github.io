import { Draw } from "./Draw.js";

export class Input {
    static keyInputObject = {
        "KeyP": false
    };

    static mouseInputObject = {
        "0": false,             // left mouse button
        "1": false,             // middle mouse button
        "2": false,             // right mouse button
        "3": false,             // back side button
        "4": false              // forward side button
    }
    static mouseButtonArray = [];

    static Cursor = class {
        static mouseC = {
            pos: {
                x: 0,
                y: 0
            }
        };

        static getCursorPos(evt) {
            const rect = Draw.Canvas.gameScreen.getBoundingClientRect(), // abs. size of element
                scaleX = Draw.Canvas.gameScreen.width / rect.width,    // relationship bitmap vs. element for x
                scaleY = Draw.Canvas.gameScreen.height / rect.height;  // relationship bitmap vs. element for y
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

window.addEventListener('keydown', e => {
    Input.keyInputObject[e.code] = true;
});

window.addEventListener('keyup', e => {
    Input.keyInputObject[e.code] = false;
});

window.addEventListener("mousedown", e => {
    Input.mouseInputObject[e.button] = true;
});

window.addEventListener("mouseup", e => {
    Input.mouseInputObject[e.button] = false;
});

window.addEventListener("mousemove", function (e) {
    Input.Cursor.getCursorPos(e);
});