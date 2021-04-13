import { createPlatform, drawPlatforms, createTileGrid, drawTileGrid, tileGrid } from "./lib/platforms.js";
import { drawPlayer, updatePlayer, playerRect } from "./lib/player.js";

export const canvas = document.querySelector('canvas');
canvas.width = 480;
canvas.height = 480;

const context = canvas.getContext('2d');

//
// Create level
//
const camera = {
    x: 0,
    y: 0
}

createTileGrid();

for (let i = 0; i < tileGrid.length; i++) {
    const tile = tileGrid[i];
    if (tile.traversable < 0.25) {
        createPlatform(tile.x, tile.y, 1, 1);
    }
    
}



//
// Start game loop
//

requestAnimationFrame(gameLoop);

function gameLoop() {
    requestAnimationFrame(gameLoop);

    //
    // update
    //


    updatePlayer();
    camera.x = playerRect.x - canvas.width / 4;

    //
    // Draw
    //

    context.clearRect(0, 0, canvas.width, canvas.height);


    drawTileGrid(context, camera)
    drawPlatforms(context, camera);
    drawPlayer(context, camera);
}