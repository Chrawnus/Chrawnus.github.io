import { Engine } from "./Engine.js";
import { getDelta, deltaVars } from "./helperFunctions.js";

const engine = new Engine();
engine.initialize();

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    requestAnimationFrame(gameLoop);
    
    deltaVars.dt = getDelta(now);
    engine.update(deltaVars.dt, now)
    engine.draw();
}








