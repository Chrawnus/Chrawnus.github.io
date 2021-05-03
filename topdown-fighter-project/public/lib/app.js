import { AddPlatformsToGrid, createTileGrid } from "./tilegrid.js";
import { pruneObstacles } from "./platform-pruner.js";
import { draw } from "./draw.js";
import { setPlayerStartPosition } from "./player.js";
import { update } from "./update.js";

let prevTime;

//Create
createTileGrid();
AddPlatformsToGrid();
pruneObstacles(0);
setPlayerStartPosition();

requestAnimationFrame(gameLoop);

function gameLoop(now) {
    requestAnimationFrame(gameLoop);

    //
    // update
    //

    const dt = getDelta(now);
    update(dt, now);

    //
    // Draw
    //

    draw();
}

function getDelta(now) {
    if (!prevTime) { prevTime = now; }
    let dt = (now - prevTime) / 1000;
    prevTime = now;
    return dt;
}






