import { AddPlatformsToGrid, createTileGrid, connectTileGrid, tileGrid } from "./tilegrid.js";
import { pruneObstacles } from "./platform-pruner.js";
import { draw } from "./draw.js";
import { setPlayerStartPosition } from "./player.js";
import { update } from "./update.js";
import { MinHeap } from "./minHeap.js";


let prevTime;

//Create
createTileGrid();
AddPlatformsToGrid();
pruneObstacles(0);
connectTileGrid();
setPlayerStartPosition();

let minHeap = new MinHeap();

for (let i = 0; i < 50; i++) {
    let val = Math.ceil(Math.random() * (i + 1) * 10);
    minHeap.insert(val, val);
}

let smallest = minHeap.extractMin();
console.log(minHeap);
console.log(smallest);
console.log(minHeap);



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






