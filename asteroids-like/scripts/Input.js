import { engine } from "./app.js";

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
    
    static getKey(code) {
        return Input.keyArray.includes(code);
    }
    static getButton(button) {
        return Input.mouseButtonArray.includes(button);
    }

    static switchPauseState(e) {
        if (e.code === "KeyP") {
            engine.paused = !engine.paused;
            if (engine.paused === false) {
                engine.dt = 0;
                engine.start();
            }
        }
    }
}

window.addEventListener('keydown', e => {
    const isKeyinObject = e.code in Input.keyInputObject;
    if(!isKeyinObject) {
        Input.keyInputObject[e.code] = true;
    } else {
        Input.keyInputObject[e.code] = true;
    }
});

window.addEventListener('keyup', e => {
    const isKeyinObject = e.code in Input.keyInputObject;
    if(!isKeyinObject) {
        Input.keyInputObject[e.code] = false;
    } else {
        Input.keyInputObject[e.code] = false;
    }
    Input.switchPauseState(e);
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