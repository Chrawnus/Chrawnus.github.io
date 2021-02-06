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

        this.nodes = [];

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
                this.tileGrid.push(
                    {
                        "width": this.tileSize.width,
                        "height": this.tileSize.height,
                        "x": x, 
                        "y": y,
                        "traversable": false,
                        "node": false,
                        "checked": {
                            "north": false,
                            "east": false,
                            "south": false,
                            "west": false
                        }
                    });

            }

            //console.log(this.tileGrid);
        }



    }

    drawTileGrid(ctx) {
        const grid = this.tileGrid;
        for (let i = 0; i < grid.length; i++) {

            if (grid[i].traversable === false && grid[i].node === false) {
                ctx.fillStyle = `gray`;
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);

            } else if (grid[i].traversable === true) {
                ctx.fillStyle = `white`;
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
            }

            if (grid[i].node === true) {
                ctx.fillStyle = `black`;
                ctx.fillRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
                ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);

            }
        }
    }

    createNode(cursorX, cursorY) {
        const grid = this.tileGrid;
        const tileWidth = this.tileSize.width;
        const tileHeight = this.tileSize.height;
        let nodes = this.nodes;

        for (let i = 0; i < grid.length; i++) {
            if (isPointOnTile(cursorX, grid, i, tileWidth, cursorY, tileHeight)) {
                grid[i].node = !(grid[i].node);
                if ((grid[i].node)) {
                    nodes.push(grid[i]);
                } else {
                    nodes.splice(nodes.indexOf(nodes[i]), 1);
                }
            }

        }

        if (nodes.length > 1) {
            
        }

        console.log(nodes);
    }

    updatePath() {
        let nodes = this.nodes;
        let nodeCount = this.nodes.length;
        let grid = this.tileGrid;


    }
}



function isPointOnTile(x, grid, i, tileWidth, y, tileHeight) {
    return (x >= grid[i].x && x < grid[i].x + tileWidth) && (y >= grid[i].y && y < grid[i].y + tileHeight);
}

