import { draw } from "./draw.js";
import { update } from "./update.js";
import { running } from "./globalGameStateHandler.js";

let prevTime;


requestAnimationFrame(gameLoop);

function gameLoop(now) {
    requestAnimationFrame(gameLoop);

    //
    // update
    //

    const dt = getDelta(now);
    if (running) {
        update(dt, now);
    }
    draw();


}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}






