// tilegrid size can only be the square of an integer
export const tileGridSize = 33**2;
export const tileSize = 32;
const wallLength = Math.sqrt(tileGridSize);
const tileGridDimensions = {
    width: tileSize,
    height: tileSize
}

export const tileGrid = [];
export const walls = [];

export function createTileGrid() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < tileGridSize; i++) {

        if (i === 0) {
            // create initial tile
            tileGrid.push({
                "width": tileGridDimensions.width,
                "height": tileGridDimensions.height,
                "x": x,
                "y": y,
                "color": "green",
                "index": i,
                gScore: Infinity,
                nodes: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
                traversable: 1,
                isUnreachable: true
            });
        } else {
            // create the rest of the tilegrid.
            // create a row with wallLength number of tiles
            // then move to the next row down
            if (!(i % wallLength) && !(i < wallLength)) {
                y += tileGridDimensions.width;
                x = 0;
            } else {
                x += tileGridDimensions.height;
            }
            tileGrid.push({
                "width": tileGridDimensions.width,
                "height": tileGridDimensions.height,
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

    }
}

function createPlatform(x, y, width, height, color = 'gray', isUnreachable = true) {
    if (!(walls.filter(e => e.x === x && e.y === y).length > 0)) {
        walls.push({
            x,
            y,
            width: width * tileGridDimensions.width,
            height: height * tileGridDimensions.height,
            color,
            IsUnreachable: isUnreachable,
        });
    }
}

export function AddPlatformsToGrid() {
    for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];
        //define outer walls
        const { upperWall, leftWall, rightWall, lowerWall } = getWallTiles(i);

        placeWalls(upperWall, leftWall, rightWall, lowerWall, tile);
    }
}

function placeWalls(upperWall, leftWall, rightWall, lowerWall, tile) {
    if (upperWall || leftWall || rightWall || lowerWall) {
        createPlatform(tile.x, tile.y, 1, 1, "gray");
        tile.traversable = 0;
    };
}

function getWallTiles(i) {
    const leftWall = i % wallLength === 0;
    const rightWall = (i - (wallLength - 1)) % wallLength === 0;
    const lowerWall = i > tileGridSize - wallLength;
    const upperWall = i <= wallLength;
    return { upperWall, leftWall, rightWall, lowerWall };
}

export function connectTileGrid() {
    for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];

        // if north tile is empty, add as north neighbour
        if (i - wallLength >= 0) {
            tile.nodes[0] = tileGrid[i - wallLength];
        }

        //if northeast tile is empty, add as northeast neighbour
        if (i - wallLength + 1 >= 0) {
            tile.nodes[1] = tileGrid[i - wallLength + 1];
        }

        // if east tile is empty, add as east neighbour
        if (((i + 1) % wallLength)) {
            tile.nodes[2] = tileGrid[i + 1];
        }

        //if southeast tile is empty add as southeast neighbour
        if (i + wallLength + 1 < tileGrid.length) {
            tile.nodes[3] = tileGrid[i + wallLength + 1];
        }

        // if south tile is empty add as south neighbour
        if (i + wallLength < tileGrid.length) {
            tile.nodes[4] = tileGrid[i + wallLength];
        }

        // if southwest tile is empty add as southwest neighbour
        if (i + wallLength - 1 < tileGrid.length) {
            tile.nodes[5] = tileGrid[i + wallLength - 1];
        }

        // if west tile is empty, add as west neighbour
        if (((i) % wallLength)) {
            tile.nodes[6] = tileGrid[i - 1];
        }

        // if northwest tile is empty, add as northwest neighbour
        if (i - wallLength - 1 >= 0) {
            tile.nodes[7] = tileGrid[i - wallLength - 1];
        }
    }
}