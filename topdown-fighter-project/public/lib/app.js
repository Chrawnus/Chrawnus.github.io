import { draw } from "./draw.js";
import { initialize } from "./initialize.js";
import { update } from "./update.js";

let prevTime;

initialize();

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    requestAnimationFrame(gameLoop);

    //
    // update
    //

    const dt = getDelta(now);

    update(dt, now);
    draw();
}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}






