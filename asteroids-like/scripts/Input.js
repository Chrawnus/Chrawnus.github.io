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