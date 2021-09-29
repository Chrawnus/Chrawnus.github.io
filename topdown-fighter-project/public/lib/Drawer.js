import { canvas } from "./elements.js";

export class Drawer {
    constructor() {
    }

    draw(world, entities) {

        const ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the viewport AFTER the matrix is reset

        // Center the camera around the player                                             
        var camX = canvas.width / 2 - entities['player'].x;
        var camY = canvas.height / 2 - entities['player'].y;

        ctx.translate(camX, camY);

        //Draw everything
        this.drawWorld(world.worldComponents, ctx)
        this.drawEntities(entities, ctx);
        this.drawEntityHealthBars(ctx, entities);

        entities['player'].attackBox.draw(ctx);
    }

    /**
 * @param {CanvasRenderingContext2D} ctx
 */
    drawWorld(worldComponents, ctx) {
        for (const component in worldComponents) {
            if (Object.hasOwnProperty.call(worldComponents, component)) {
                this.drawTiles(worldComponents[component], ctx);
            }
        }
    }
    
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

    drawEntities(entities, ctx) {
        for (const entity in entities) {
            if (Object.hasOwnProperty.call(entities, entity)) {
                this.drawEntity(entities[entity], ctx);
            }
        }
    }

    drawEntityHealthBars(ctx, entities) {
        for (const entity in entities) {
            if (Object.hasOwnProperty.call(entities, entity)) {
                this.drawHealthBar(ctx, entities, entity);
            }
        }
    }



    drawHealthBar(ctx, entities, entity) {
        ctx.fillStyle = "red";
        let x = entities[entity].x;
        let y = entities[entity].y - entities[entity].height / 2;
        let w = entities[entity].health / entities[entity].maxHealth * 25;
        let h = 5;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, w, h);
    }
}
