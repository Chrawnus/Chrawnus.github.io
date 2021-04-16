import { drawDistance } from "../app.js";

export const platforms = [];
export const tileSize = 64;
const tileGridDimensions = {
    width: tileSize,
    height: tileSize
}

export const visiblePlatforms = [];
export const visibleTileGrid = [];

export const tileGridSize = 16384;

export const tileGrid = [];

export function createPlatform(x, y, width, height, color = 'white', unreachable = true, pruned = false) {
    platforms.push({
        x,
        y,
        width: width * tileGridDimensions.width,
        height: height * tileGridDimensions.height,
        color,
        unreachable,
        pruned
    });
}

/**
 * @param {CanvasRenderingContext2D} context 
 */
export function drawPlatforms(context) {
    for (let i = 0; i < visiblePlatforms.length; i++) {
        const platform = visiblePlatforms[i];
        const platformSection = intersectingRect(platform, drawDistance);
        context.fillStyle = platform.color;
        context.fillRect(
            platformSection.x,
            platformSection.y,
            platformSection.width,
            platformSection.height
        );
    }
}

export function createTileGrid() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < tileGridSize; i++) {

        if (!(i % tileGridDimensions.height)) {
            x += tileGridDimensions.width;
            y = 0;
        } else {
            y += tileGridDimensions.height;
        }

        tileGrid.push({ "width": tileGridDimensions.width, "height": tileGridDimensions.height, "x": x, "y": y, traversable: Math.random(), unreachable: true})
    }

}

 export function drawTileGrid(context) {
    const grid = visibleTileGrid;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].unreachable) {
            context.strokeStyle = 'red';
        } else if (grid[i].traversable === 1) {
            context.strokeStyle = 'blue';
        } else {
            context.strokeStyle = 'green';
        }
        const gridSection = intersectingRect(grid[i], drawDistance);
        context.strokeRect(
            gridSection.x, 
            gridSection.y, 
            gridSection.width, 
            gridSection.height
            );
        context.fillStyle = "red";
    }
}

function rectanglesIntersect(rect, view) {
    const aLeftOfB = rect.x + rect.width < view.x;
    const aRightOfB = rect.x > view.x + view.width;
    const aAboveB = rect.y > view.y + view.height;
    const aBelowB = rect.y + rect.height < view.y;

    return !( aLeftOfB || aRightOfB || aAboveB || aBelowB );
}

export function manageVisiblePlatforms() {
    for (let i = 0; i < platforms.length; i++) {
        const tile = platforms[i];
        const tileIsNotInArray = !(visiblePlatforms.filter(e => e.x === tile.x && e.y === tile.y).length > 0);
        if (rectanglesIntersect(tile, drawDistance) && tileIsNotInArray) {
            visiblePlatforms.push(tile);
        } else if ((!rectanglesIntersect(tile, drawDistance) && !tileIsNotInArray)) {
            visiblePlatforms.splice(visiblePlatforms.indexOf(tile), 1);
        }
    }

/*     for (let i = 0; i < tileGrid.length; i++) {
        const tile = tileGrid[i];
        const tileIsNotInArray = !(visibleTileGrid.filter(e => e.x === tile.x && e.y === tile.y).length > 0);
        if (rectanglesIntersect(tile, drawDistance) && tileIsNotInArray) {
            visibleTileGrid.push(tile);
        } else if (!rectanglesIntersect(tile, drawDistance) && !tileIsNotInArray) {
            visibleTileGrid.splice(visibleTileGrid.indexOf(tile), 1);
        }
    } */
}

function intersectingRect(r1,r2){
    var x=Math.max(r1.x,r2.x);
    var y=Math.max(r1.y,r2.y);
    var xx=Math.min(r1.x+r1.width,r2.x+r2.width);
    var yy=Math.min(r1.y+r1.height,r2.y+r2.height);
    return({x:x,y:y,width:xx-x,height:yy-y});
  }