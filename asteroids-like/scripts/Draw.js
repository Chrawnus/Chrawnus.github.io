// fetch custom font and add it to document so it can be used on canvas.
const customFont = new FontFace("PressStart2P", 'url(assets/fonts/PressStart2P-Regular.ttf');
customFont.load().then(function (font) {
    document.fonts.add(font);
})

export class Draw {
    static Canvas = class {
        static gameScreen = document.querySelector('#canvas-game');
        static UI = document.querySelector('#canvas-menu');
        static gameCtx = this.gameScreen.getContext("2d");
        static UICtx = this.UI.getContext("2d");
    }


    static canvasMethods = class {
        static draw(backgroundColor, engine, menu, player, entities, projectiles) {
            const gameCtx = Draw.Canvas.gameCtx;
            const UICtx = Draw.Canvas.UICtx;

            // Clear game canvas and UI canvas
            Draw.canvasMethods.clearCanvas(Draw.Canvas.UI, UICtx, "transparent")
            Draw.canvasMethods.clearCanvas(Draw.Canvas.gameScreen, gameCtx, backgroundColor);

            // Handle which UI to draw on canvas
            Draw.drawUIHandler(player, engine, menu, UICtx);

            // Draw player on canvas
            Draw.drawEntity(gameCtx, player);

            // Draw asteroids on canvas
            Draw.drawEntities(gameCtx, entities);
            Draw.drawProjectiles(gameCtx, projectiles);
        }

        static clearCanvas(canvas, ctx, fillStyle) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = fillStyle;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }


    /*
    Handle which UI to draw on screen
    depending on if the game is running,
    paused, or if the player has lost all their lives.
    */
    static drawUIHandler(player, engine, menu, UICtx) {
        if (player.lives > 0) {
            if (engine.pauseState === false) {
                menu.drawUI(UICtx);
            } else {
                menu.drawPauseUI(UICtx);
            }
        } else {
            menu.drawUIGameOver(UICtx);
        }
    }

    /*
    Loop through a given array of entities 
    and draw them on the screen.
    */
    static drawEntities(ctx, entities) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            ctx.save();
            Draw.translateAndRotate(ctx, entity);
            Draw.Geometry.drawShape(ctx, entity.points, entity.strokeStyle);
            ctx.restore();
        }
    }

    /*
    Draw the a single entity
    on the screen.
    */
    static drawEntity(ctx, entity) {
        ctx.save();
        Draw.translateAndRotate(ctx, entity);
        Draw.Geometry.drawShape(ctx, entity.points, entity.strokeStyle);
        ctx.restore();
    }

    /*
    Draw all non-expired projectiles
    on the screen. 
    */
    static drawProjectiles(ctx, projectiles) {
        for (let i = 0; i < projectiles.length; i++) {
            const projectile = projectiles[i];
            Draw.Geometry.drawCircle(ctx, "white", 1, projectile.pos, projectile.radius);
        }
    }

    static translateAndRotate(ctx, entity) {
        ctx.translate(entity.pos.x, entity.pos.y);
        ctx.rotate(entity.rotationAngle);
    }

    static Geometry = class {
        /**
        * Draws a shape from an array of point2D objects.
        * @param  {CanvasRenderingContext2D} ctx
        * @param  {Array} points Array from which to build the shape
        * @param  strokeStyle
        */
        static drawShape(ctx, points, strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 0; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            ctx.lineTo(points[0].x, points[0].y);
            ctx.stroke();
            ctx.closePath();
        }

        /**
        * Draws a circle from a given mid point and radius.
        * @param  {CanvasRenderingContext2D} ctx
        * @param  strokeStyle
        * @param  {Number} lineWidth
        * @param  {Point2d} center
        * @param  {Number} radius
        */
        static drawCircle(ctx, strokeStyle, lineWidth, center, radius) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath;
        }
    }
}
