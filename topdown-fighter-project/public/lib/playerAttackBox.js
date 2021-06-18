import { playerRect } from "./player.js";

export const attackBox = {
    x: undefined,
    y: undefined,
    width: undefined,
    height: undefined,
    direction: undefined,
    color: 'red',
    isActive: false,
    originalLifetime: 1,
    lifetime: 1,
    originalDelay: 10,
    delay: 10
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
        attackBox.x = playerRect.x - 1.6 * playerRect.width;
        if (direction === 'up') {
            attackBox.y = playerRect.y - playerRect.height * 2.8;
        } else {
            attackBox.y = playerRect.y + playerRect.height;
        } 
    }

    if (direction === 'left' || direction === 'right') {
        if (direction === 'right') {
            attackBox.x = playerRect.x + playerRect.width;
        } else {
            attackBox.x = playerRect.x - 2.8 * playerRect.width;
        }
        
        attackBox.y = playerRect.y - 1.6 * playerRect.height;
    }

    if (direction === 'up') {
        attackBox.width = playerRect.width * 4.2;
        attackBox.height = playerRect.height * 2.8;
    }

    if (direction === 'right') {
        attackBox.width = playerRect.width * 2.8;
        attackBox.height = playerRect.height * 4.2;
    }

    if (direction === 'left') {
        attackBox.width = playerRect.width * 2.8;
        attackBox.height = playerRect.height * 4.2;
    }

    if (direction === 'down') {
        attackBox.width = playerRect.width * 4.2;
        attackBox.height = playerRect.height * 2.8;
    }
    
    attackBox.isActive = true;
}

export function updateAttackBox(dt) {
    if (attackBox.delay > 0) {
       attackBox.delay -= 1000 * dt; 
    } else {
        if (attackBox.isActive && attackBox.lifetime > 0) {
            if (attackBox.direction === 'up' || attackBox.direction === 'down') {
                attackBox.x = playerRect.x - 1.6 * playerRect.width;
                if (attackBox.direction === 'up') {
                    attackBox.y = playerRect.y - playerRect.height * 2.8;
                } else {
                    attackBox.y = playerRect.y + playerRect.height;
                } 
            }
        
            if (attackBox.direction === 'left' || attackBox.direction === 'right') {
                if (attackBox.direction === 'right') {
                    attackBox.x = playerRect.x + playerRect.width;
                } else {
                    attackBox.x = playerRect.x - 2.8 * playerRect.width;
                }
                
                attackBox.y = playerRect.y - 1.6 * playerRect.height;
            }
            attackBox.lifetime -= 1000*dt;
        } else if (attackBox.isActive && attackBox.lifetime <= 0) {
                attackBox.isActive = false;
                attackBox.lifetime = attackBox.originalLifetime;
                attackBox.delay = attackBox.originalDelay;
                attackBox.x = undefined;
                attackBox.y = undefined;
                attackBox.width = undefined;
                attackBox.height = undefined;
        }
        attackBox.delay = attackBox.originalDelay;
    }
}