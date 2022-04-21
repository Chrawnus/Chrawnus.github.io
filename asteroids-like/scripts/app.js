import { Engine } from "./Engine.js"

export const engine = new Engine();

engine.initialize(6, 800, 600, 10);
engine.start();


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