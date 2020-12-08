export class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.x2 = x + width;
        this.y2 = y + height;

        this.width = width;
        this.height = height;
        
        this.color = "red"
    }



    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }


}