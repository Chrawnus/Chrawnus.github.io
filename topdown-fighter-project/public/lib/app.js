import { gameStateHandler } from "./globalGameStateHandler.js";
import { getDelta, deltaVars } from "./helperFunctions.js";



requestAnimationFrame(gameLoop);

function gameLoop(now) {
    requestAnimationFrame(gameLoop);
    
    deltaVars.dt = getDelta(now);
    gameStateHandler(deltaVars.dt, now);
}








