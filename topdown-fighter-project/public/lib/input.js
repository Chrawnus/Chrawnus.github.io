export const keys = [];

window.addEventListener('keydown', e => {
    keys[e.key] = true;
    console.log(keys)
});

window.addEventListener('keyup', e => {
    
    if (e.key === 'W' || e.key === 'w') {
        keys['W'] = false;
        keys['w'] = false;
    }

    if (e.key === 'A' || e.key === 'a') {
        keys['A'] = false;
        keys['a'] = false;
    }

    if (e.key === 'S' || e.key === 's') {
        keys['S'] = false;
        keys['s'] = false;
    }

    if (e.key === 'D' || e.key === 'd') {
        keys['D'] = false;
        keys['d'] = false;
    }

    

    keys[e.key] = false;
    console.log(keys)
});

export function getKey(key) {
    return keys[key];
}

export const keyCodes = {
    
    W: 'W',
    w: 'w',
    A: 'A',
    a: 'a',
    S: 'S',
    s: 's',
    D: 'D',
    d: 'd',
    z: 'z',
    x: 'x',
    arrowUp: 'ArrowUp',
    arrowRight: 'ArrowRight',
    arrowDown: 'ArrowDown',
    arrowLeft: 'ArrowLeft',
    shift: 'Shift',
    space: ' '
}