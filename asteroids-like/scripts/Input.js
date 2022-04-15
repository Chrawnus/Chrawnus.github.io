export class Input {
    static keyArray = [];

    static getKey(code) {
        return this.keyArray.includes(code);
        
    }

    static keyCodes = {  
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
}

window.addEventListener('keydown', e => {
    if (!Input.keyArray.includes(e.code)) {
        Input.keyArray.push(e.code);
    }
});

window.addEventListener('keyup', e => { 
    Input.keyArray.splice(Input.keyArray.indexOf(e.code), 1);

});