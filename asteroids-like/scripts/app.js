import { Engine } from "./Engine.js"

// Initialize and start the game engine with the given step size (ms), 
// and width and height of the canvas element in pixels
const engine = new Engine();
engine.initialize(6, 1280, 720);
engine.start();

// various event listeners for reading key presses and mouse movement.
window.addEventListener('keydown', e => {
    engine.switchPauseState(e);
});

window.addEventListener('keydown', e => {
    engine.input.keyInputObject[e.code] = true;
});

window.addEventListener('keyup', e => {
    engine.input.keyInputObject[e.code] = false;
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