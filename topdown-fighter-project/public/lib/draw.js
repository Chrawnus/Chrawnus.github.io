import { clamp } from "./helperFunctions.js";
import { canvas, ctx } from "./elements.js";
import { tileGrid, walls, tileGridSize } from "./tilegrid.js";
import { playerRect } from "./player.js";
import { drawAttackBox } from "./playerAttackBox.js";
import { enemyRect } from "./enemy.js";


export function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the viewport AFTER the matrix is reset


    // Center the camera around the player                                             
    var camX = canvas.width / 2 - playerRect.x;
    var camY = canvas.height / 2 - playerRect.y;

    ctx.translate(camX, camY);

    //Draw everything
    drawTiles(tileGrid, ctx);
    drawTiles(walls, ctx);
    drawEntity(playerRect, ctx);
    drawEntity(enemyRect, ctx);
    drawEntityHealthBar(ctx, enemyRect);
    drawEntityHealthBar(ctx, playerRect);


    drawAttackBox(ctx);



}
/**
 * @param {CanvasRenderingContext2D} ctx
 */
function drawTiles(tiles, ctx) {
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        drawEntity(tile, ctx);
    }
}

export function drawPlatforms(ctx) {
    for (let i = 0; i < walls.length; i++) {
        const platform = walls[i];
        drawEntity(platform, ctx);
    }
}

/**
 * @param {CanvasRenderingContext2D} ctx
 */

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

function drawEntityHealthBar(ctx, entity) {
    ctx.fillStyle = "red";
    let x = entity.x;
    let y = entity.y - entity.height / 2;
    let w = entity.health / entity.maxHealth * 25;
    let h = 5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = "black"
    ctx.strokeRect(x, y, w, h);
}

