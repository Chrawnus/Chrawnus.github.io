import { createPlatform, drawPlatforms } from "./lib/platforms.js";
import { drawPlayer, updatePlayer, playerRect } from "./lib/player.js";

export const canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 450;

const context = canvas.getContext('2d');

//
// Create level
//
export const camera = {
    x: 0,
    y: 0
}

createPlatform(200, canvas.height - 100, 120, 40);
createPlatform(400, canvas.height - 40, 40, 40);
createPlatform(500, canvas.height - 100, 40, 40, 'magenta');

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

    drawPlatforms(context, camera);
    drawPlayer(context, camera);

}