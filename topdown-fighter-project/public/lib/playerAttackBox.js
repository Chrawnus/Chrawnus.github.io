import { playerRect } from "./player.js";

export const attackBox = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    direction: undefined,
    color: 'red',
    isActive: false,
    originalLifetime:50,
    lifetime: 50,
};

/**
 * @param {CanvasRenderingContext2D} ctx
 */
 export function drawAttackBox(ctx) {
    ctx.strokeStyle = attackBox.color;
    ctx.strokeRect(
        attackBox.x,
        attackBox.y,
        attackBox.width,
        attackBox.height
    );
}

export function createAttackBox(direction) {
    attackBox.direction = direction;
    if (direction === 'up' || direction === 'down') {
        attackBox.x = playerRect.x - playerRect.width/2;
        attackBox.y = playerRect.y + playerRect.height/2;
    }

    if (direction === 'left' || direction === 'right') {
        attackBox.x = playerRect.x + playerRect.width/2;
        attackBox.y = playerRect.y - playerRect.height/2;
    }

    if (direction === 'up') {
        attackBox.width = playerRect.width * 2;
        attackBox.height = -playerRect.height * 4.2;
    }

    if (direction === 'right') {
        attackBox.width = playerRect.width * 4.2;
        attackBox.height = playerRect.height * 2;
    }

    if (direction === 'left') {
        attackBox.width = -playerRect.width * 4.2;
        attackBox.height = playerRect.height * 2;
    }

    if (direction === 'down') {
        attackBox.width = playerRect.width * 2;
        attackBox.height = playerRect.height * 4.2;
    }
    
    attackBox.isActive = true;
}

export function updateAttackBox(dt) {
    if (attackBox.isActive && attackBox.lifetime > 0) {
        if (attackBox.direction === 'up' || attackBox.direction === 'down') {
            attackBox.x = playerRect.x - playerRect.width/2;
            attackBox.y = playerRect.y + playerRect.height/2;
        }
    
        if (attackBox.direction === 'left' || attackBox.direction === 'right') {
            attackBox.x = playerRect.x + playerRect.width/2;
            attackBox.y = playerRect.y - playerRect.height/2;
        }
        attackBox.lifetime -= 1000*dt
    } else if (attackBox.isActive && attackBox.lifetime <= 0) {
        attackBox.isActive = false;
        attackBox.lifetime = attackBox.originalLifetime;
    }
}