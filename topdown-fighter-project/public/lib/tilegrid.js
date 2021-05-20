// tileGridSize min size 256, has to be a square number divisible by 2
export const tileGridSize = 1024;
export const tileSize = 32;
const wallLength = Math.sqrt(tileGridSize);
const tileGridDimensions = {
    width: tileSize,
    height: tileSize
}

export const tileGrid = [];
export const visibleTileGrid = [];

export const obstacles = [];
export const visibleObstacles = [];

export const floodGrid = [];

export function createTileGrid() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < tileGridSize; i++) {

        if (!(i % wallLength)) {
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
            nodes: [undefined, undefined, undefined, undefined],
            traversable: 1,
            isUnreachable: true,
            isCenter: false,
            gCost: 0,
            previous: undefined
        });
    }
}

function createPlatform(x, y, width, height, color = 'white', isUnreachable = true) {
    if (!(obstacles.filter(e => e.x === x && e.y === y).length > 0)) {
        obstacles.push({
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
        const { wallLength, upperWall, leftWall, rightWall, lowerWall } = getWallTiles(i);
        //define wall openings/gates
        const { middleOfUpperWall, middleOfLeftWall, middleOfRightWall, middleOfLowerWall } = getGateTiles(wallLength, i);
        if (!upperWall && !leftWall && !rightWall && !lowerWall) {
            addToFloodGrid(tile);
        }
        if (!isCenterTile(tile)) {
            determineObstacles(tileGrid, i, Math.random());
            placeObstacles(tile);
        } else {
            tile.traversable = 1;
            tile.isCenter = true;
        }
        placeWallsAndGates(middleOfUpperWall, upperWall, middleOfLeftWall, leftWall, middleOfRightWall, rightWall, middleOfLowerWall, lowerWall, tile);
    }
}

function placeObstacles(tile) {
    if ((floodGrid.findIndex(e => e.x === tile.x && e.y === tile.y) > -1) &&
        (tile.traversable < 0.33)) {
        createPlatform(tile.x, tile.y, 1, 1);
    };
    return 0;
}

function placeWallsAndGates(middleOfUpperWall, upperWall, middleOfLeftWall, leftWall, middleOfRightWall, rightWall, middleOfLowerWall, lowerWall, tile) {
    if (!(middleOfUpperWall) && upperWall ||
        !(middleOfLeftWall) && leftWall ||
        !(middleOfRightWall) && rightWall ||
        !(middleOfLowerWall) && lowerWall) {
        createPlatform(tile.x, tile.y, 1, 1, "white");
        tile.traversable = 0;
    };
    if ((middleOfUpperWall) && upperWall ||
        (middleOfLeftWall) && leftWall ||
        (middleOfRightWall) && rightWall ||
        (middleOfLowerWall) && lowerWall) {
        tile.traversable = 1;
    }
}

function getGateTiles(wallLength, i) {
    const middleOfHorizontalWall = wallLength / 2;
    const middleOfUpperWall = i > middleOfHorizontalWall - wallLength / 6 && i < middleOfHorizontalWall + wallLength / 6;
    const middleOfLowerWall = i > tileGridSize - middleOfHorizontalWall - 4 && i < tileGridSize - middleOfHorizontalWall + 4;
    const middleOfVerticalWall = tileGridSize / 2;
    const middleOfLeftWall = i > middleOfVerticalWall - 4 * wallLength && i < middleOfVerticalWall + 4 * wallLength;
    const middleOfRightWall = i > tileGridSize - middleOfVerticalWall - 3 * wallLength && i < tileGridSize - middleOfVerticalWall + 4 * wallLength;
    return { middleOfUpperWall, middleOfLeftWall, middleOfRightWall, middleOfLowerWall };
}

function getWallTiles(i) {
    const wallLength = Math.sqrt(tileGridSize);
    const leftWall = i % wallLength === 0;
    const rightWall = (i - (wallLength - 1)) % wallLength === 0;
    const lowerWall = i > tileGridSize - wallLength;
    const upperWall = i <= wallLength;
    return { wallLength, upperWall, leftWall, rightWall, lowerWall };
}

export function getCenterTile() {
    for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];

        if (isCenterTile(tile)) {

            return {
                x: tile.x,
                y: tile.y
            }
        }
    }
}

function isCenterTile(tile) {
    const wallLength = Math.floor(Math.sqrt(tileGridSize));
    const middleOfHorizontalWall = Math.floor(wallLength / 2);
    const middleOfVerticalWall = Math.floor(tileGridSize / 2);

    return tile.x === tileGrid[middleOfHorizontalWall].x && tile.y === tileGrid[middleOfVerticalWall].y;
}

function addToFloodGrid(tile) {
    floodGrid.push({
        x: tile.x,
        y: tile.y,
        tile: tile
    })
}

function determineObstacles(grid, i, seed) {
    const myrng = new Math.seedrandom(seed + i);
    const wallLength = Math.floor(Math.sqrt(tileGridSize));
    const middleOfHorizontalWall = Math.floor(wallLength / 2);
    const middleOfVerticalWall = Math.floor(tileGridSize / 2);

    if ((grid[i].x > grid[middleOfHorizontalWall - 4].x && grid[i].x < grid[middleOfHorizontalWall + 4].x) ||
        (grid[i].y > grid[middleOfVerticalWall - 4 * wallLength].y && grid[i].y < grid[middleOfVerticalWall + 4 * wallLength].y)) {
        return grid[i].traversable = myrng() + 0.22;
    } else {
        return grid[i].traversable = myrng();
    }
}

export function connectTileGrid() {
    for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];

        // if north tile is empty, add as north neighbour
        if (i - wallLength >= 0) {
            if (tile.traversable >= 0.33 &&
                tileGrid[i - wallLength].traversable >= 0.33
            ) {
                tile.nodes[0] = i - wallLength;
            }
        }

        //if northeast tile is empty, add as northeast neighbour
/*         if (i - wallLength + 1 >= 0) {
            if (tile.traversable >= 0.33 &&
                tileGrid[i - wallLength + 1].traversable >= 0.33
            ) {
                tile.nodes[1] = i - wallLength + 1;
            }
        } */

        // if east tile is empty, add as east neighbour
        if (tile.traversable >= 0.33 &&
            ((i + 1) % wallLength) &&
            tileGrid[i + 1].traversable >= 0.33
        ) {
            tile.nodes[1] = i + 1;
        }

        // if southeast tile is empty add as southeast neighbour
/*         if (i + wallLength + 1 < tileGrid.length) {
            if (tile.traversable >= 0.33 &&
                tileGrid[i + wallLength + 1].traversable >= 0.33
            ) {
                tile.nodes[3] = i + wallLength + 1;
            }
        } */

        // if south tile is empty add as south neighbour
        if (i + wallLength < tileGrid.length) {
            if (tile.traversable >= 0.33 &&
                tileGrid[i + wallLength].traversable >= 0.33
            ) {
                tile.nodes[2] = i + wallLength;
            }
        }
        
        // if southwest tile is empty add as southwest neighbour
/*         if (i + wallLength - 1 < tileGrid.length) {
            if (tile.traversable >= 0.33 &&
                tileGrid[i + wallLength - 1].traversable >= 0.33
            ) {
                tile.nodes[5] = i + wallLength - 1;
            }
        } */

        // if west tile is empty, add as west neighbour
        if (tile.traversable >= 0.33 &&
            ((i - 1) % wallLength) &&
            tileGrid[i - 1].traversable >= 0.33
        ) {
            tile.nodes[3] = i - 1;
        }

        // if northwest tile is empty, add as northwest neighbour
/*         if (i - wallLength - 1 >= 0) {
            if (tile.traversable >= 0.33 &&
                tileGrid[i - wallLength - 1].traversable >= 0.33
            ) {
                tile.nodes[0] = i - wallLength - 1;
            }
        } */




    }
}