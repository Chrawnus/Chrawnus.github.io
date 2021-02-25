export let keyArr = [];

const keyValues = ['Control', 'Shift'];
window.addEventListener("keydown", keyDownEventsHandler);
window.addEventListener("keyup", keyUpEventsHandler);
function keyDownEventsHandler(e) {
    if (keyValues.includes(e.key)) {
        if (!(keyArr.includes(e.key))) {
            keyArr.push(e.key);
        }
    }
}
function keyUpEventsHandler(e) {
    if (keyValues.includes(e.key)) {
        if ((keyArr.includes(e.key))) {
            keyArr.splice(keyArr.indexOf(e.key), 1);
        }
    }
}
