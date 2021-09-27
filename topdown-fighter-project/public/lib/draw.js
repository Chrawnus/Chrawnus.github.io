import { canvas } from "./elements.js";
import { player } from "./player.js";
import { enemyRect } from "./enemy.js";


export class Drawer {
    constructor() {

    }

    draw(tileGrid, walls) {
        const ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the viewport AFTER the matrix is reset


        // Center the camera around the player                                             
        var camX = canvas.width / 2 - player.x;
        var camY = canvas.height / 2 - player.y;

        ctx.translate(camX, camY);

        //Draw everything
        this.drawTiles(tileGrid, ctx);
        this.drawTiles(walls, ctx);
        this.drawEntity(player, ctx);
        this.drawEntity(enemyRect, ctx);
        this.drawEntityHealthBar(ctx, enemyRect);
        this.drawEntityHealthBar(ctx, player);
        player.attackBox.draw(ctx);
    }

    /**
 * @param {CanvasRenderingContext2D} ctx
 */
    drawTiles(tiles, ctx) {
        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            this.drawEntity(tile, ctx);
        }
    }

    drawPlatforms(ctx) {
        for (let i = 0; i < this.walls.length; i++) {
            const platform = this.walls[i];
            this.drawEntity(platform, ctx);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */

    drawEntity(entity, ctx) {
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

    drawEntityHealthBar(ctx, entity) {
        ctx.fillStyle = "red";
        let x = entity.x;
        let y = entity.y - entity.height / 2;
        let w = entity.health / entity.maxHealth * 25;
        let h = 5;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "black"
        ctx.strokeRect(x, y, w, h);
    }



}


