export const keys = [];

window.addEventListener('keydown', e => {
    keys[e.key] = true;
});

window.addEventListener('keyup', e => {
    keys[e.key] = false;
});

export function getKey(key) {
    return keys[key];
}

export const keyCodes = {
    a: 'a',
    w: 'w',
    d: 'd',
    s: 's',
    z: 'z',
    x: 'x',
    arrowUp: 'ArrowUp',
    arrowRight: 'ArrowRight',
    arrowDown: 'ArrowDown',
    arrowLeft: 'ArrowLeft'
}