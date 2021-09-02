import { playerRect, getPlayerPos } from "./player.js";
import { canvas } from "./elements.js";
import { tileGridSize } from "./tilegrid.js";

export const camera = {
    x: 0,
    y: 0
};

export function updateCameraPosition() {
    const playerPosCanvas = getPlayerPos(canvas);

    if (playerPosCanvas.x > tileGridSize && playerPosCanvas.x < tileGridSize) {
        camera.x = playerRect.x - tileGridSize;
    }

    if (playerPosCanvas.y < canvas.height && playerPosCanvas.y > 0 + canvas.height) {
        camera.y = playerRect.y - canvas.height;
    } else if (playerPosCanvas.y < canvas.height) {
        camera.y = -32;
    }
}








