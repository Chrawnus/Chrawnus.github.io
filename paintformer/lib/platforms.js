export const platforms = [];

const tileSize = {
    width: 32,
    height: 32
}

export const tileGridSize = 4096;

export const tileGrid = [];

export function createPlatform(x, y, width, height, color = 'white') {
    platforms.push({
        x,
        y,
        width: width * tileSize.width,
        height: height * tileSize.height,
        color
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

        if (!(i % tileSize.height)) {
            x += tileSize.width;
            y = 0;
        } else {
            y += tileSize.height;
        }

        tileGrid.push({ "width": tileSize.width, "height": tileSize.height, "x": x, "y": y, traversable: Math.random() })
    }

}

 export function drawTileGrid(ctx) {
    const grid = tileGrid;
    for (let i = 0; i < grid.length; i++) {
        ctx.strokeRect(grid[i].x, grid[i].y, grid[i].width, grid[i].height);
        ctx.fillStyle = "red";
        ctx.fillRect(grid[i].x, grid[i], grid[i].width, grid[i].height);
    }
}