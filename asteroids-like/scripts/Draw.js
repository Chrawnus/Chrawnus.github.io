export class Draw {

    static Canvas = class {
        static gameScreen = document.querySelector('#canvas-game');
        static UI = document.querySelector('#canvas-menu');
        static gameCtx = this.gameScreen.getContext("2d");
        static UICtx = this.UI.getContext("2d");
    }

    static canvasMethods = class {
        static drawScreen(backgroundColor, menu, player, entities, projectiles) {
            const gameCtx = Draw.Canvas.gameCtx;
            const UICtx = Draw.Canvas.UICtx;
            Draw.canvasMethods.clearCanvas(Draw.Canvas.UI, UICtx, "transparent")
            menu.draw(UICtx);
            Draw.canvasMethods.clearCanvas(Draw.Canvas.gameScreen, gameCtx, backgroundColor);
            Draw.drawPlayer(gameCtx, player);
            Draw.drawEntities(gameCtx, entities);
            Draw.drawProjectiles(gameCtx, projectiles);
            gameCtx.scale(Draw.Canvas.scaleX, Draw.Canvas.scaleY)
        }

        static clearCanvas(canvas, ctx, fillStyle) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = fillStyle;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        static translateOriginToEntity(ctx, entity) {
            ctx.translate(entity.pos.x, entity.pos.y);
        }

        static rotateCanvasAroundEntity(ctx, entity) {
            ctx.rotate(entity.rotationAngle);
        }
    }

    static drawEntities(ctx, entities) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            ctx.save();
            Draw.canvasMethods.translateOriginToEntity(ctx, entity);
            Draw.canvasMethods.rotateCanvasAroundEntity(ctx, entity);
            Draw.Geometry.drawShape(ctx, entity.points, entity.strokeStyle);
            ctx.restore();
            Draw.Geometry.drawCircle(ctx, "red", 2, entity.pos, entity.hitboxRadius) //hitbox
        }
    }

    static drawProjectiles(ctx, projectiles) {
        for (let i = 0; i < projectiles.length; i++) {
            const projectile = projectiles[i];
            Draw.Geometry.drawCircle(ctx, "white", 1, projectile.pos, projectile.radius);
        }
    }

    

    static drawPlayer(ctx, player) {
        ctx.save();
        Draw.canvasMethods.translateOriginToEntity(ctx, player);
        Draw.canvasMethods.rotateCanvasAroundEntity(ctx, player);
        Draw.Geometry.drawShape(ctx, player.points, player.strokeStyle);
        ctx.restore();
        Draw.Geometry.drawCircle(ctx, "red", 2, player.pos, player.hitboxRadius) //hitbox
    }

    static Geometry = class {
        /**
        * Draws a shape from an array of point2D objects.
        * @param  {CanvasRenderingContext2D} ctx
        * @param  {Array} points Array from which to build the shape
        * @param  {StrokeStyle} strokeStyle
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
        * @param  {StrokeStyle} strokeStyle
        * @param  {Number} lineWidth Thickness of the circumference of the circle
        * @param  {Point2d} center Center coordinate of the circle
        * @param  {Number} radius Length of the circle radius
        */
        static drawCircle(ctx, strokeStyle, lineWidth, center, radius) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath;
        }

        static drawLine(ctx, strokeStyle, points) {
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 0; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }
            //ctx.lineTo(points[0].x, points[0].y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

// Prevent context menu from appearing when right clicking canvas.
Draw.Canvas.gameScreen.oncontextmenu = function (e) {
    e.preventDefault();
};

Draw.Canvas.UI.oncontextmenu = function (e) {
    e.preventDefault();
};