export class Draw {

    static canvasMethods = class {
        static draw(canvas, backgroundColor, entities) {
            const ctx = canvas.getContext("2d");
            Draw.canvasMethods.clearCanvas(canvas, ctx, backgroundColor);
            Draw.drawEntities(ctx, entities);
            
        }

        static clearCanvas(canvas, ctx, fillStyle) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = fillStyle;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        static translateOriginToEntity(ctx, entity) {
            ctx.translate(entity.pos.x, entity.pos.y);
        }

        static rotateAroundEntity(ctx, entity) {
            ctx.rotate(entity.rotationAngle);
        }

    }


    static drawEntities(ctx, entities) {
        for (let i = 0; i < entities.length; i++) {
            const entity = entities[i];
            entity.draw(ctx);
        }
    }

    

    static Geometry = class {

        /**
        * Draws a shape from an array of point2D objects.
        * @param  {CanvasRenderingContext2D} ctx
        * @param  {Array} points Array from which to build the shape
        * @param  {StrokeStyle} strokeStyle
        */
        static drawShape(ctx, points, strokeStyle) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 0; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }
                ctx.lineTo(points[0].x, points[0].y);
                
                ctx.strokeStyle = strokeStyle;
                ctx.lineWidth = 1;
        
                ctx.stroke();
                ctx.closePath();
        }
    }
}