import { canvasElem } from "./app.js";
import { HelperFunctions } from "./helperFunctions.js";



export class TileGrid {
    constructor(tiles) {
        this.world = [];
        this.tiles = tiles;
        this.tileGrid = [];
        this.tileSize = {
            width: canvasElem.width / (Math.sqrt(this.tiles)),
            height: canvasElem.height / (Math.sqrt(this.tiles))
        }

        this.helper = new HelperFunctions();
    }

    addWorld(obj) {
        this.world.push(obj);
    }

    createTileGrid() {
        const world = this.world[0]
        
        let x = 0;
        let y = 0;
        for (let i = 0; i < Math.sqrt(this.tiles); i++) {
            for (let j = 0; j < Math.sqrt(this.tiles); j++) {
                y = i * this.tileSize.width;
                x = j * this.tileSize.width;
                this.tileGrid.push({ "width": this.tileSize.width, "height": this.tileSize.height, "x": x, "y": y, "traversable": this.helper.getRandomInt(0,4), "fillColor" : undefined, "defaultColor" : undefined})   
            } 
            
            
        }

        for (let i = 0; i < this.tileGrid.length; i++) {
            if (this.tileGrid[i].traversable === 0) {
                this.tileGrid[i].fillColor = `darkgray`;
                this.tileGrid[i].defaultColor = `darkgray`;
            } else if (this.tileGrid[i].traversable === 1) {
                this.tileGrid[i].fillColor = `lightgreen`;
                this.tileGrid[i].defaultColor = `lightgreen`;
            } else if (this.tileGrid[i].traversable === 2) {
                this.tileGrid[i].fillColor = `green`;
                this.tileGrid[i].defaultColor = `green`;
            } else if (this.tileGrid[i].traversable === 3) {
                this.tileGrid[i].fillColor = `darkgreen`;
                this.tileGrid[i].defaultColor = `darkgreen`;
            }

            
        }


        
    }
    

    drawTileGrid(ctx) {
        const grid = this.tileGrid;
        for (let i = 0; i < grid.length; i++) {
            
            if (grid[i].traversable === 0) {
                
                ctx.fillStyle = `${grid[i].fillColor}`;
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                
            } else if (grid[i].traversable === 1) {
                
                ctx.fillStyle = `${grid[i].fillColor}`;
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                //ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
            } else if (grid[i].traversable === 2) {
                ctx.fillStyle = `${grid[i].fillColor}`;
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                //ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
            } else if (grid[i].traversable === 3) {
                ctx.fillStyle = `${grid[i].fillColor}`;
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                //ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
            }
        }

    }
}