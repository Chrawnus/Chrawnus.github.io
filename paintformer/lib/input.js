const keys = [];

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
    leftArrow: 'ArrowLeft',
    upArrow: 'ArrowUp',
    rightArrow: 'ArrowRight',
    downArrow: 'ArrowDown',
    z: 'z',
    x: 'x'
}