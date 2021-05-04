
import { tileGridSize, tileGrid, tileSize } from "./tilegrid.js";
import { getKey, keyCodes, keys } from "./input.js";
import { attackBox, createAttackBox, updateAttackBox } from "./playerAttackBox.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { obstacles } from "./tilegrid.js";



export class Player {
    constructor(x, y, width, height, speed) {
        this.idle = false;
        this.speed = 250;
        this.pos = {
            x: x,
            y: y
        }


        this.vx = 0;
        this.vy = 0;
        this.dx;
        this.dy;
        this.target = {
            "pos": {
                x: undefined,
                y: undefined
            },
        };
    }



    update(delta) {
        this.movementHandler(delta);
        this.movement(delta);

    }

    movementHandler(delta) {

    }

    movement(delta) {
        this.pos.y += this.vy * delta;
        this.pos.x += this.vx * delta;
    }

    enemyMove(dt) {
        this.vx -= getKey(keyCodes.a) ? this.speed * dt : 0;
        this.vx += getKey(keyCodes.d) ? this.speed * dt : 0;
        this.vy += getKey(keyCodes.s) ? this.speed * dt : 0;
        this.vy -= getKey(keyCodes.w) ? this.speed * dt : 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        )
    }

    getPrevXAndPrevY() {
        if (!this.prevPos.x) { this.prevPos.x = this.pos.x; }
        if (!this.prevPos.y) { this.prevPos.y = this.pos.y; }

        this.dx = this.pos.x - this.prevPos.x;
        this.dy = this.pos.y - this.prevPos.y;

        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }


}


