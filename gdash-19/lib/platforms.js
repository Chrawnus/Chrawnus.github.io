export const platforms = [];

export function createPlatform(x, y, width, height, color = 'white') {
    platforms.push({
        x,
        y,
        width,
        height,
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