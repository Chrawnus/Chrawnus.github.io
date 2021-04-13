export const platforms = [];

const tileSize = {
    width: 40,
    height: 40
}

export const tileGrid = [];

export function createPlatform(x, y, width, height, color = 'white') {
    platforms.push({
        x,
        y,
        width: width * 40,
        height: height * 40,
        color
    });
}

/**
 * @param {CanvasRenderingContext2D} context 
 */
export function drawPlatforms(context, camera) {
    for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i];
        context.fillStyle = platform.color;
        context.fillRect(
            platform.x - camera.x,
            platform.y - camera.y,
            platform.width,
            platform.height
        );
    }
}

export function createTileGrid() {
    let x = 0;
    let y = 0;
    for (let i = 0; i < 480; i++) {

        if (!(i % 40) && !(i === 0)) {
            y += tileSize.height;
            x = 0;
        } else {
            x += tileSize.width;
        }

        tileGrid.push({ "width": tileSize.width, "height": tileSize.height, "x": x, "y": y, traversable: Math.random() })
    }

    console.log(tileGrid);
}

 export function drawTileGrid(ctx, camera) {
    const grid = tileGrid;
    for (let i = 0; i < grid.length; i++) {
        ctx.strokeRect(grid[i].x - camera.x, grid[i].y  - camera.y, grid[i].width, grid[i].height);
        ctx.fillStyle = "red";
        ctx.fillRect(grid[i].x - camera.x, grid[i].y - camera.y, grid[i].width, grid[i].height);
    }
}