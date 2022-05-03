import { Engine } from "./Engine.js"

// Initialize and start the game engine with the given step size (ms), 
// and width and height of the canvas element in pixels
const engine = new Engine(6);
engine.initialize(1280, 720);
engine.start();

// various event listeners for reading key presses and mouse movement.
window.addEventListener('keydown', e => {
    engine.input.keyInputObject[e.code] = true;
});

window.addEventListener('keyup', e => {
    engine.input.keyInputObject[e.code] = false;
    if (e.code === "KeyP") {
        engine.pauseState = !engine.pauseState;
        if (engine.pauseState === false) {
            engine.start();
        }
    }
});

window.addEventListener("mousedown", e => {
    engine.input.mouseInputObject[e.button] = true;
});

window.addEventListener("mouseup", e => {
    engine.input.mouseInputObject[e.button] = false;
});

window.addEventListener("mousemove", function (e) {
    engine.input.Cursor.getCursorPos(e, engine);
});

// Prevent context menu from appearing when right clicking page.
document.oncontextmenu = function (e) {
    e.preventDefault();
};