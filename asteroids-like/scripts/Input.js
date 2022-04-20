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



    static switchPauseState(e) {
        if (e.code !== "KeyP") {
            return 0
        }

        if (Input.keyInputObject["KeyP"] !== false) {
            engine.paused = !engine.paused;
            if (engine.paused === false) {
                engine.dt = 0;
                engine.start();
            }
        }

    }

}

window.addEventListener('keydown', e => {
    Input.keyInputObject[e.code] = true;
    console.log(Input.keyInputObject)
    Input.switchPauseState(e);
});

window.addEventListener('keyup', e => {
    Input.keyInputObject[e.code] = false;
    console.log(Input.keyInputObject)


});

window.addEventListener("mousedown", e => {
    Input.mouseInputObject[e.button] = true;
});

window.addEventListener("mouseup", e => {
    Input.mouseInputObject[e.button] = false;
});