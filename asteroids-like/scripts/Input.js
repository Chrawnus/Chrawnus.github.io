import { engine } from "./app.js";

export class Input {
    static keyArray = [];
    static keyPressed;
    static keyReleased;
    static mouseButtonArray = [];
    static mouseBtnPressed;
    static mouseBtnReleased;

    static getKey(code) {
        return Input.keyArray.includes(code);
    }
    static getButton(button) {
        return Input.mouseButtonArray.includes(button);
    }
}

window.addEventListener('keydown', e => {
    if (!Input.keyArray.includes(e.code)) {
        Input.keyArray.push(e.code);
    }
    Input.keyPressed = e.code;
});

window.addEventListener('keyup', e => {
    Input.keyArray.splice(Input.keyArray.indexOf(e.code), 1);
    Input.keyReleased = e.code;
    if (Input.keyReleased === "KeyP") {
        engine.paused = !engine.paused;
        if (engine.paused === false) {
            engine.dt = 0;
            engine.start();
        }
    }
});

window.addEventListener("mousedown", e => {
    if (!Input.mouseButtonArray.includes(e.button)) {
        Input.mouseButtonArray.push(e.button);
    }
    Input.mouseBtnPressed = e.button;
});

window.addEventListener("mouseup", e => {
    Input.mouseButtonArray.splice(Input.mouseButtonArray.indexOf(e.button), 1);
    Input.mouseBtnReleased = e.button;
});