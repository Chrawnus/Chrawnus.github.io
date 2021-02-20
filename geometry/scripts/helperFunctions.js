export class Helper {
    constructor() {

    }
    static isMouseDown = false;

    static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    static getCursorPos(canvasElem, event, x, y) {
        const rect = canvasElem.getBoundingClientRect();
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;

        return { x, y }
    }

    static numDigits(x) {
        if (x > 2147483647) {
            return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
        } else {
            return (Math.log10((x ^ (x >> 31)) - (x >> 31)) | 0) + 1;
        }
    }

    static getNthPlaceDigit(x, n) {
        return Math.floor((x / 10 ** (n - 1)) % 10);
    }

    static decimalPlaces(num) {
        let match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) { return 0; }
        return Math.max(
            0,
            // Number of digits right of decimal point.
            (match[1] ? match[1].length : 0)
            // Adjust for scientific notation.
            - (match[2] ? +match[2] : 0));
    }
}

window.addEventListener('pointerdown', () => Helper.isMouseDown = true);
window.addEventListener('pointerup', () => Helper.isMouseDown = false);



