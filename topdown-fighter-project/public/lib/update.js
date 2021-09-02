import { gameStateHandler } from "./globalGameStateHandler.js";
import { updateCamera } from "./camera.js";
import { updatePlayer } from "./player.js";
import { updateEnemy } from './enemy.js'



export function update(dt, now) {
    gameStateHandler();
    updatePlayer(dt);
    updateEnemy(dt, now);
    updateCamera();
}











