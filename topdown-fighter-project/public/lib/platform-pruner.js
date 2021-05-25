import { floodGrid, obstacles, tileGrid, tileSize, placeObstacles } from "./tilegrid.js";

//recursive function; traverses array of obstacles and prunes obstacles that are in unwanted positions
export function pruneObstacles(pass) {
    for (let i = obstacles.length - 1; i > 0; i--) {
        const tile = obstacles[i];

        // first pass, remove any lone tiles on the map
        if (pass === 0) {
            if (tileHasNoNeighbours(tile)) {
                obstacles.splice(obstacles.indexOf(tile), 1);
            }
        }

        // second pass, remove tiles that only has neighbouring tiles on the diagonals
        if (pass === 1) {
            if (tileHasOnlyDiagonalNeighbours(tile)) {
                obstacles.splice(obstacles.indexOf(tile), 1);
            }
        }

        //third pass, flood fill
        if (pass === 2) {
            fourWayFloodFill(floodGrid[190])
            if (tileIsUnreachable(tile)) {
                obstacles.splice(obstacles.indexOf(tile), 1);
            }
        }
    }

    // exit function when we are done with the last pass
    if (pass < 2) {
        pruneObstacles((pass + 1))
    } else {
        return 0;
    }



}

function tileHasOnlyDiagonalNeighbours(tile) {
    const isTileAbove = obstacles.filter(e => e.x === tile.x && e.y === tile.y + tileSize).length > 0;
    const isTileToRight = obstacles.filter(e => e.x === tile.x + tileSize && e.y === tile.y).length > 0;
    const isTileBelow = obstacles.filter(e => e.x === tile.x && e.y === tile.y - tileSize).length > 0;
    const isTileToLeft = obstacles.filter(e => e.x === tile.x - tileSize && e.y === tile.y).length > 0;
    
    return !(isTileAbove) &&
        !(isTileToRight) &&
        !(isTileBelow) &&
        !(isTileToLeft);
}

function tileIsUnreachable(tile) {
    return tile.isUnreachable;
}

function tileHasNoNeighbours(tile) {
    const isTileAbove = obstacles.filter(e => e.x === tile.x && e.y === tile.y + tileSize).length > 0;
    const isTileToRight = obstacles.filter(e => e.x === tile.x + tileSize && e.y === tile.y).length > 0;
    const isTileBelow = obstacles.filter(e => e.x === tile.x && e.y === tile.y - tileSize).length > 0;
    const isTileToLeft = obstacles.filter(e => e.x === tile.x - tileSize && e.y === tile.y).length > 0;
    
    const isTileOnUpperRightDiagonal = obstacles.filter(e => e.x === tile.x + tileSize && e.y === tile.y - tileSize).length > 0;
    const isTileOnUpperLeftDiagonal = obstacles.filter(e => e.x === tile.x - tileSize && e.y === tile.y - tileSize).length > 0;
    const isTileOnLowerLeftDiagonal = obstacles.filter(e => e.x === tile.x - tileSize && e.y === tile.y + tileSize).length > 0;
    const isTileOnLowerRightDiagonal = obstacles.filter(e => e.x === tile.x + tileSize && e.y === tile.y + tileSize).length > 0;

    return !(isTileOnUpperLeftDiagonal) &&
        !(isTileToLeft) &&
        !(isTileOnLowerLeftDiagonal) &&
        !(isTileBelow) &&
        !(isTileAbove) &&
        !(isTileOnUpperRightDiagonal) &&
        !(isTileToRight) &&
        !(isTileOnLowerRightDiagonal);
}


function fourWayFloodFill(tile) {
    const i = tileGrid.findIndex(e => e.x === tile.x && e.y === tile.y);

    if ((obstacles.filter(e => e.x === tileGrid[i].x && e.y === tileGrid[i].y).length > 0)) {
        
        tileGrid[i].isUnreachable = false;
        obstacles[obstacles.findIndex((e => e.x === tile.x && e.y === tile.y))].isUnreachable = false;
        return;
    }
    
    tileGrid[i].isUnreachable = false;
    const up = floodGrid.findIndex(e => e.x === tile.x && e.y === tile.y - tileSize)
    const right = floodGrid.findIndex(e => e.x === tile.x + tileSize && e.y === tile.y)
    const down = floodGrid.findIndex(e => e.x === tile.x && e.y === tile.y + tileSize)
    const left = floodGrid.findIndex(e => e.x === tile.x - tileSize && e.y === tile.y)

    let tileGridUp;
    let tileGridRight;
    let tileGridDown;
    let tileGridLeft;

    const isNotUpperBoundary = up > -1;
    const isNotRightBoundary = right > -1;
    const isNotLowerBoundary = down > -1;
    const isNotLeftBoundary = left > -1;

    if (isNotUpperBoundary) {
        tileGridUp = tileGrid.findIndex(e => e.x === floodGrid[up].x && e.y === floodGrid[up].y);
    }
    if (isNotRightBoundary) {
        tileGridRight = tileGrid.findIndex(e => e.x === floodGrid[right].x && e.y === floodGrid[right].y);
    }
    if (isNotLowerBoundary) {
        tileGridDown = tileGrid.findIndex(e => e.x === floodGrid[down].x && e.y === floodGrid[down].y);
    }
    if (isNotLeftBoundary) {
        tileGridLeft = tileGrid.findIndex(e => e.x === floodGrid[left].x && e.y === floodGrid[left].y);
    }

    const gridTileUp = tileGrid[tileGridUp];
    const gridTileDown = tileGrid[tileGridDown];
    const gridTileLeft = tileGrid[tileGridLeft];
    const gridTileRight = tileGrid[tileGridRight];

    const isEmptyAboveTile = gridTileUp ? obstacles.findIndex(e => e.x === gridTileUp.x && e.y === gridTileUp.y) === -1 : 0;
    const isEmptyBelowTile = gridTileDown ? obstacles.findIndex(e => e.x === gridTileDown.x && e.y === gridTileDown.y) === -1 : 0;
    const isEmptyToLeftOfTile = gridTileLeft ? obstacles.findIndex(e => e.x === gridTileLeft.x && e.y === gridTileLeft.y) === -1 : 0;
    const isEmptyToRightOfTile = gridTileRight ? obstacles.findIndex(e => e.x === gridTileRight.x && e.y === gridTileRight.y) === -1 : 0;


    if (isNotUpperBoundary && gridTileUp.isUnreachable && isEmptyAboveTile) {
        fourWayFloodFill(floodGrid[up])
    }

    if (isNotLowerBoundary && gridTileDown.isUnreachable && isEmptyBelowTile) {
        fourWayFloodFill(floodGrid[down])
    }
    if (isNotLeftBoundary && gridTileLeft.isUnreachable && (tile.y > 576 || tile.y < 448) && isEmptyToLeftOfTile) {
        fourWayFloodFill(floodGrid[left])
    }
    if (isNotRightBoundary && gridTileRight.isUnreachable && isEmptyToRightOfTile) {
        fourWayFloodFill(floodGrid[right])
    }


}