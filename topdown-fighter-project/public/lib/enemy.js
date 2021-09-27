import { getDistanceBetweenPoints, intersectRect } from "./helperFunctions.js";
import { moveCollideX, moveCollideY } from "./physics.js";

export class Enemy {
    constructor() {
        this.x = 640;
        this.y = 640;
        this.width = 32 * 0.8;
        this.height = 32 * 0.8;
        this.maxHealth = 100;
        this.health = 100;
        this.attack = 50;
        this.currentInhabitedTile = undefined;
        this.color = 'red';
        this.initialSpeed = 100;
        this.speed = 100;
        this.maxSpeed = 250;
        this.knockback = 15;
        this.startingAttackDelay = 300;
        this.attackDelay = 300;
        this.target = undefined;
        this.vx = 0;
        this.vy = 0;
        this.pathToPlayer = [];
        this.statBoosts = {
            health: 10,
            speed: 10,
            attack: 5,
            attackSpeed: 1,
        }
    }

    update(dt, now, initializer) {

        this.resetVelocity();

        if (getDistanceBetweenPoints(this.x, this.y, initializer.player.x, initializer.player.y) < 55) {
            this.enemyAttack(initializer.player, dt);
        }

        this.move(dt);
        if (intersectRect(this, initializer.player.attackBox)) {
            this.onAttacked(initializer.player);
        }

        moveCollideX(this.vx, this, initializer.walls, this.onCollideX);
        moveCollideY(this.vy, this, initializer.walls, this.onCollideY);

        moveCollideY(this.vy, this, initializer.player, this.onCollideY);
        moveCollideX(this.vx, this, initializer.player, this.onCollideX);
    };


    resetVelocity() {
        this.vx = 0;
        this.vy = 0;
    }

    move(dt) {
        if (!(this.pathToPlayer === undefined) && this.pathToPlayer.length > 1) {
            let last = this.pathToPlayer.length - 1;
            const enemyX = this.x + this.width / 2;
            const enemyY = this.y + this.height / 2;
            let targetX = this.pathToPlayer[last].x + this.pathToPlayer[last].width / 2;
            let targetY = this.pathToPlayer[last].y + this.pathToPlayer[last].height / 2;
            if (getDistanceBetweenPoints(enemyX, enemyY, targetX, targetY) < 10) {
                if (this.pathToPlayer.length > 2) {
                    this.pathToPlayer.splice(last, 1);
                }


            } else {
                last = this.pathToPlayer.length - 1;
                targetX = this.pathToPlayer[last].x + this.pathToPlayer[last].width / 2;
                targetY = this.pathToPlayer[last].y + this.pathToPlayer[last].height / 2;
                const dx = targetX - enemyX;
                const dy = targetY - enemyY;
                const angle = Math.atan2(dy, dx)

                this.vx = this.speed * Math.cos(angle) * dt;
                this.vy = this.speed * Math.sin(angle) * dt;
            }
        }
    }

    boostStats() {
        this.maxHealth += this.statBoosts.health;
        this.speed < this.maxSpeed ? this.speed += this.statBoosts.speed :
            this.speed > this.maxSpeed ? this.speed = this.maxSpeed : 0;
        this.attack += this.statBoosts.attack;
    }

    enemyAttack(player, dt) {
        if (player.health > 0) {
            player.health -= this.attack * dt;
        }
    }

    onAttacked(player) {
        if (this.health > 0) {
            this.health -= player.attack;
            this.knockBackFunction(player.attackBox.direction)
        }

    }

    knockBackFunction(attackDirection) {
        this.vy -= attackDirection === 'arrowUp' ? this.knockback : 0;
        this.vy += attackDirection === 'arrowDown' ? this.knockback : 0;
        this.vx -= attackDirection === 'arrowLeft' ? this.knockback : 0;
        this.vx += attackDirection === 'arrowRight' ? this.knockback : 0;

        return;
    }

    onCollideX(rect, otherRect) {
        rect.vx = 0;
        return true;
    }

    onCollideY(rect, otherRect) {
        rect.vy = 0;
        return true;
    }
}















