import { draw } from "./draw.js";
import { update } from "./update.js";
import { getDelta, deltaVars } from "./helperFunctions.js";

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    requestAnimationFrame(gameLoop);
    
    deltaVars.dt = getDelta(now);
    update(deltaVars.dt, now);

    draw();
}








