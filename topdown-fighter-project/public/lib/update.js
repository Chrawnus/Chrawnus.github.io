import { gameStateHandler, running } from "./globalGameStateHandler.js";
import { updateCameraPosition } from "./camera.js";
import { updatePlayer } from "./player.js";
import { updateEnemy } from './enemy.js'



export function update(dt, now) {
    if (!running) {
        return
    }
    gameStateHandler();
    updatePlayer(dt);
    updateEnemy(dt, now);
    updateCameraPosition();
}











