export const platforms = [];
export const tileSize = 64;
const tileGridDimensions = {
    width: tileSize,
    height: tileSize
}

export const tileGridSize = 16384;

export const tileGrid = [];

export function createPlatform(x, y, width, height, color = 'white', unreachable = true) {
    platforms.push({
        x,
        y,
        width: width * tileGridDimensions.width,
        height: height * tileGridDimensions.height,
        color,
        unreachable
    });
}

/**
 * @param {CanvasRenderingContext2D} context 
 */
export function drawPlatforms(context) {
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        context.fillStyle = platform.color;
        context.fillRect(
            platform.x,
            platform.y,
            platform.width,
            platform.height
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
    const grid = tileGrid;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].unreachable) {
            context.strokeStyle = 'red';
        } else if (grid[i].traversable === 1) {
            context.strokeStyle = 'blue';
        } else {
            context.strokeStyle = 'green';
        }
        
        context.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
        context.fillStyle = "red";
        context.fillRect(grid[i].x, grid[i], grid[i].width, grid[i].height);
    }
}