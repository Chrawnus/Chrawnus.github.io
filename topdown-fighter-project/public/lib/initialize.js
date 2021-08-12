import { AddPlatformsToGrid, createTileGrid, connectTileGrid } from "./tilegrid.js";
import { pruneObstacles } from "./platform-pruner.js";
import { setPlayerStartPosition } from "./player.js";

//Create
export function initialize() {
    createTileGrid();
    AddPlatformsToGrid();
    pruneObstacles(0);
    connectTileGrid();
    setPlayerStartPosition();
}
