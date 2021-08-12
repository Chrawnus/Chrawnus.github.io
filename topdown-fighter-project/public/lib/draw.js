import { clamp } from "./helperFunctions.js";
import { canvas, ctx } from "./canvas.js";
import { tileGrid, obstacles, floodGrid, tileGridSize } from "./tilegrid.js";
import { playerRect } from "./player.js";
import { drawDistance } from "./update.js";
import { attackBox, drawAttackBox } from "./playerAttackBox.js";

import { enemyRect } from "./enemy.js";



export function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the viewport AFTER the matrix is reset
 

    //Clamp the camera position to the world bounds while centering the camera around the player                                             
    var camX = clamp(canvas.width / 2 - playerRect.x, -tileGridSize * 0.77, 0);
    var camY = clamp(canvas.height / 2 - playerRect.y, -tileGridSize * 0.77, 24);

    ctx.translate(camX, camY);

    //Draw everything
    drawTileGrid(ctx);
    drawPlatforms(ctx);
    drawPlayer(ctx);
    drawEnemy(ctx);
    drawEnemyHealthBar(ctx);
    drawPlayerHealthBar(ctx);
    if (attackBox.isActive === true) {
        drawAttackBox(ctx);
    }
    drawView();
}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
export function drawTileGrid(ctx) {
    const wallLength = Math.sqrt(tileGridSize);

    const grid = tileGrid;
    for (let i = 0; i < grid.length; i++) {
        const tile = grid[i];
        drawEntity(tile, ctx);
    }
}

export function drawPlatforms(ctx) {
    for (let i = 0; i < obstacles.length; i++) {
        const platform = obstacles[i];
        drawEntity(platform, ctx);
    }
}

export function drawFloodGrid(ctx) {
    for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];
        if (floodGrid.findIndex(e => e.x === tile.x && e.y === tile.y) === -1) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillRect(
                tile.x,
                tile.y,
                tile.width,
                tile.height
            );
        }
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */
 export function drawPlayer(ctx) {
    drawEntity(playerRect, ctx);
}

function drawEnemy(ctx) {
    drawEntity(enemyRect, ctx);
}

function drawEntity(entity, ctx) {
    ctx.fillStyle = entity.color;
    ctx.fillRect(
        entity.x,
        entity.y,
        entity.width,
        entity.height
    );
    ctx.strokeStyle = "black";
    ctx.strokeRect(
        entity.x,
        entity.y,
        entity.width,
        entity.height
    );
}

function drawEnemyHealthBar(ctx) {
    ctx.fillStyle = "red";
    let x = enemyRect.x;
    let y = enemyRect.y - enemyRect.height/2;
    let w = enemyRect.health/enemyRect.maxHealth * 25;
    let h = 5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "black"
    ctx.strokeRect(x,y,w,h);
}

function drawPlayerHealthBar(ctx) {
    ctx.fillStyle = "red";
    let x = playerRect.x;
    let y = playerRect.y - playerRect.height/2;
    let w = playerRect.health/playerRect.maxHealth * 25;
    let h = 5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "black"
    ctx.strokeRect(x,y,w,h);
}
export function drawView() {
    ctx.beginPath();
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(drawDistance.x, drawDistance.y, drawDistance.width, drawDistance.height);
    ctx.closePath();
}