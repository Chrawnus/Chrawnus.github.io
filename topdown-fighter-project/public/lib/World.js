// tilegrid size can only be the square of an integer
export class World {
    constructor() {
        this.tileGridSize = 33 ** 2;
        this.tileSize = 32;
        this.wallLength = Math.sqrt(this.tileGridSize);
        this.tileGridDimensions = {
            width: this.tileSize,
            height: this.tileSize
        }
        this.tileGrid = [];
        this.walls = [];
    }

    createTileGrid() {
        let x = 0;
        let y = 0;
        for (let i = 0; i < this.tileGridSize; i++) {

            if (i === 0) {
                // create initial tile
                this.pushTileToGrid(x, y, i);
            } else {
                // create the rest of the tilegrid.
                // create a row with wallLength number of tiles
                // then move to the next row down
                ({ y, x } = this.determineTilePosition(i, y, x));
                this.pushTileToGrid(x, y, i);
            }

        }
        
        this.AddPlatformsToGrid();
        this.connectTileGrid();
    }

    determineTilePosition(i, y, x) {
        if (!(i % this.wallLength) && !(i < this.wallLength)) {
            y += this.tileGridDimensions.width;
            x = 0;
        } else {
            x += this.tileGridDimensions.height;
        }
        return { y, x };
    }

    pushTileToGrid(x, y, i) {
        this.tileGrid.push({
            "width": this.tileGridDimensions.width,
            "height": this.tileGridDimensions.height,
            "x": x,
            "y": y,
            "color": "green",
            "index": i,
            gScore: Infinity,
            nodes: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
            traversable: 1,
            isUnreachable: true
        });
    }

    createPlatform(x, y, width, height, color = 'gray', isUnreachable = true) {
        if (!(this.walls.filter(e => e.x === x && e.y === y).length > 0)) {
            this.walls.push({
                x,
                y,
                width: width * this.tileGridDimensions.width,
                height: height * this.tileGridDimensions.height,
                color,
                IsUnreachable: isUnreachable,
            });
        }
    }

    AddPlatformsToGrid() {
        for (let i = 0; i < this.tileGrid.length; i++) {
            const tile = this.tileGrid[i];
            //define outer walls
            const { upperWall, leftWall, rightWall, lowerWall } = this.getWallTiles(i);
    
            this.placeWalls(upperWall, leftWall, rightWall, lowerWall, tile);
        }
    }

    placeWalls(upperWall, leftWall, rightWall, lowerWall, tile) {
        if (upperWall || leftWall || rightWall || lowerWall) {
            this.createPlatform(tile.x, tile.y, 1, 1, "gray");
            tile.traversable = 0;
        };
    }

    getWallTiles(i) {
        const leftWall = i % this.wallLength === 0;
        const rightWall = (i - (this.wallLength - 1)) % this.wallLength === 0;
        const lowerWall = i > this.tileGridSize - this.wallLength;
        const upperWall = i <= this.wallLength;
        return { upperWall, leftWall, rightWall, lowerWall };
    }

    connectTileGrid() {
        for (let i = 0; i < this.tileGrid.length; i++) {
            const tile = this.tileGrid[i];
    
            // if north tile is empty, add as north neighbour
            if (i - this.wallLength >= 0) {
                tile.nodes[0] = this.tileGrid[i - this.wallLength];
            }
    
            //if northeast tile is empty, add as northeast neighbour
            if (i - this.wallLength + 1 >= 0) {
                tile.nodes[1] = this.tileGrid[i - this.wallLength + 1];
            }
    
            // if east tile is empty, add as east neighbour
            if (((i + 1) % this.wallLength)) {
                tile.nodes[2] = this.tileGrid[i + 1];
            }
    
            //if southeast tile is empty add as southeast neighbour
            if (i + this.wallLength + 1 < this.tileGrid.length) {
                tile.nodes[3] = this.tileGrid[i + this.wallLength + 1];
            }
    
            // if south tile is empty add as south neighbour
            if (i + this.wallLength < this.tileGrid.length) {
                tile.nodes[4] = this.tileGrid[i + this.wallLength];
            }
    
            // if southwest tile is empty add as southwest neighbour
            if (i + this.wallLength - 1 < this.tileGrid.length) {
                tile.nodes[5] = this.tileGrid[i + this.wallLength - 1];
            }
    
            // if west tile is empty, add as west neighbour
            if (((i) % this.wallLength)) {
                tile.nodes[6] = this.tileGrid[i - 1];
            }
    
            // if northwest tile is empty, add as northwest neighbour
            if (i - this.wallLength - 1 >= 0) {
                tile.nodes[7] = this.tileGrid[i - this.wallLength - 1];
            }
        }
    }
}










