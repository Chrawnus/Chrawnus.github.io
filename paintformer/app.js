import { createPlatform, drawPlatforms, createTileGrid, drawTileGrid, tileGrid, tileGridSize, platforms, tileSize } from "./lib/platforms.js";
import { drawPlayer, updatePlayer, playerRect } from "./lib/player.js";



export const canvas = document.querySelector('canvas');
canvas.width = 1024;
canvas.height = 720;
let playerPosCanvas = 0;

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
    if (tile.traversable < 0.33 && 
        tile.y > 0 && 
        tile.y < 960 && 
        !(tile.y === 448 || tile.y === 512 || tile.y === 576)) {
        createPlatform(tile.x, tile.y, 1, 1);
    }
}


console.log(tileGrid[0].y)


pruneTileGrid();

tileGrid[tileGrid.findIndex(e => e.x === tileSize && e.y === 512)].traversable = 1;


console.log(platforms.length)



//
// Start game loop
//

requestAnimationFrame(gameLoop);

function pruneTileGrid() {
    let floodFilled = false;
    for (let i = 0; i < platforms.length; i++) {
        const tile = platforms[i];
        
        if (tileHasNoNeighbours(tile)) {
            platforms.splice(platforms.indexOf(tile), 1);
            if (i > 0) {
                i -= 1;
            }
            
        } 

        if (tileHasOnlyDiagonalNeighbours(tile)) {
            platforms.splice(platforms.indexOf(tile), 1);
            if (i > 0) {
                i -= 1;
            }
        }

        if (floodFilled === false) {
            fourWayFloodFill(tileGrid[tileGrid.findIndex(e => e.x === tileSize && e.y === 512)]);
            floodFilled = true;
        }        

        if (tileIsUnreachable(tile)) {
            platforms.splice(platforms.indexOf(tile), 1);
            if (i > 0) {
                i -= 1;
            }
        }



    }
}

function tileHasOnlyDiagonalNeighbours(tile) {
    return !(platforms.filter(e => e.x === tile.x && e.y === tile.y - tileSize).length > 0) &&
        !(platforms.filter(e => e.x === tile.x && e.y === tile.y + tileSize).length > 0) &&
        !(platforms.filter(e => e.x === tile.x - tileSize && e.y === tile.y).length > 0) &&
        !(platforms.filter(e => e.x === tile.x + tileSize && e.y === tile.y).length > 0);
}

function tileIsUnreachable(tile) {
    return tile.unreachable;
}

function tileHasNoNeighbours(tile) {
    return !(platforms.filter(e => e.x === tile.x - tileSize && e.y === tile.y - tileSize).length > 0) &&
        !(platforms.filter(e => e.x === tile.x - tileSize && e.y === tile.y).length > 0) &&
        !(platforms.filter(e => e.x === tile.x - tileSize && e.y === tile.y + tileSize).length > 0) &&
        !(platforms.filter(e => e.x === tile.x && e.y === tile.y - tileSize).length > 0) &&
        !(platforms.filter(e => e.x === tile.x && e.y === tile.y + tileSize).length > 0) &&
        !(platforms.filter(e => e.x === tile.x + tileSize && e.y === tile.y - tileSize).length > 0) &&
        !(platforms.filter(e => e.x === tile.x + tileSize && e.y === tile.y).length > 0) &&
        !(platforms.filter(e => e.x === tile.x + tileSize && e.y === tile.y + tileSize).length > 0);
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    //
    // update
    //


    updatePlayer();
    playerPosCanvas = getPlayerPos(canvas);

    if (playerPosCanvas.x > tileGridSize * 0.03 && playerPosCanvas.x < tileGridSize * 0.84) {
        camera.x = playerRect.x - tileGridSize * 0.03;
    }

    if (playerPosCanvas.y < canvas.height && playerPosCanvas.y > 0 + canvas.height * 0.54) {
        camera.y = playerRect.y - canvas.height * 0.54;
    } else if (playerPosCanvas.y < canvas.height * 0.54) {
        camera.y = -24;
    }

    //
    // Draw
    //

    draw();



}

function getPlayerPos(canvas) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (playerRect.x - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (playerRect.y - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function draw() {
    context.setTransform(1, 0, 0, 1, 0, 0);//reset the transform matrix as it is cumulative
    context.clearRect(0, 0, canvas.width, canvas.height);//clear the viewport AFTER the matrix is reset

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(canvas.width / 2 - playerRect.x, -tileGridSize * 0.77, 0);
    var camY = clamp(canvas.height / 2 - playerRect.y, -332, 24);

    context.translate(camX, camY);

    //Draw everything
    drawTileGrid(context);    
    drawPlatforms(context);

    drawPlayer(context);
}

function clamp(value, min, max) {
    if (value < min) return min;
    else if (value > max) return max;
    return value;
}

function fourWayFloodFill(tile) {

    if ((platforms.filter(e => e.x === tile.x && e.y === tile.y).length > 0)) {
        tile.unreachable = false;
        platforms[platforms.findIndex((e => e.x === tile.x && e.y === tile.y))].unreachable = false;
        return;
    }

    tile.unreachable = false;
    const up = tileGrid.findIndex(e => e.x === tile.x && e.y === tile.y - tileSize)
    const right = tileGrid.findIndex(e => e.x === tile.x + tileSize && e.y === tile.y)
    const down = tileGrid.findIndex(e => e.x === tile.x && e.y === tile.y + tileSize)
    const left = tileGrid.findIndex(e => e.x === tile.x - tileSize && e.y === tile.y)
    
    if (up > -1 && tileGrid[up].unreachable) {
        fourWayFloodFill(tileGrid[up])
    }
    if (down > -1  && tileGrid[down].unreachable) {
        fourWayFloodFill(tileGrid[down])
    }
    if (right > -1 && tileGrid[right].unreachable) {
        fourWayFloodFill(tileGrid[right])
    }
    if (left > -1 && tileGrid[left].unreachable && (tile.y > 576 || tile.y < 448)) {
        fourWayFloodFill(tileGrid[left])
    }







}
