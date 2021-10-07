import { canvas } from "./elements.js";


// Class to handle drawing of game world and it's entities.
export class Drawer {
    constructor() {
    }

    draw(world, entities) {

        const ctx = canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0); //reset the transform matrix as it is cumulative
        ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the viewport AFTER the matrix is reset

        // Center the camera around the player                                             
        let camX = canvas.width / 2 - entities['player'].x;
        let camY = canvas.height / 2 - entities['player'].y;
        ctx.translate(camX, camY);

        //Draw everything
        this.drawWorld(world.worldComponents, ctx)
        this.drawEntities(entities, ctx);
        this.drawEntityHealthBars(ctx, entities);

        entities['player'].attackBox.draw(ctx);
        entities['enemy'].attackBox.draw(ctx);
    }

    /**
    * @param {CanvasRenderingContext2D} ctx
    */

    // This function loops through every array of tiles in worldComponent, and passes each array of tiles as an arguments to the drawTiles function.
    drawWorld(worldComponents, ctx) {
        for (const component in worldComponents) {
            if (Object.hasOwnProperty.call(worldComponents, component)) {
                this.drawTiles(worldComponents[component], ctx);
            }
        }
    }

    // Takes a given tile array, and loops through it, calling drawEntity on each tile in order to draw them on the screen.
    drawTiles(tiles, ctx) {

        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            this.drawEntity(tile, ctx);
        }
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     */

    // Draws a given entity on the screen, based on the properties of the entity. 
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

    // Loops through an object containing a list of entities, 
    // and calls drawEntity for each entity in the list.
    drawEntities(entities, ctx) {
        for (const entity in entities) {
            if (Object.hasOwnProperty.call(entities, entity)) {
                this.drawEntity(entities[entity], ctx);
            }
        }
    }

    // Loops through an object containing a list of entities, 
    // and calls drawHealthBar for each entity in the list.
    drawEntityHealthBars(ctx, entities) {
        for (const entity in entities) {
            if (Object.hasOwnProperty.call(entities, entity)) {
                this.drawHealthBar(ctx, entities, entity);
            }
        }
    }


    // Draws a red healthbar on top of the entity 
    // passed as a parameter, that depletes as the entity loses health. 
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
