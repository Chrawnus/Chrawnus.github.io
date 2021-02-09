import { keyArr } from "./app.js";

export class InputHelper {
    constructor() {
        
    }

    keyDownEventsHandler(e) {
        if (e.key.startsWith('Control')) {
            if (!(keyArr.includes(e.key))) {
                keyArr.push(e.key);
                if ((keyArr.length > 2)) {
                    keyArr.shift();
                }
            }
        }
    
    }
    
    
    keyUpEventsHandler(e) {
        if (e.key.startsWith('Control')) {
            if ((keyArr.includes(e.key))) {
                keyArr.splice(keyArr.indexOf(e.key), 1);
            }
        }
    }
}