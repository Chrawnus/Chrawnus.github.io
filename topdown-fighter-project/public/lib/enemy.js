import { Entity } from "./Entity.js";
import { getDistanceBetweenPoints, intersectRect } from "./helperFunctions.js";

export class Enemy extends Entity {
    constructor(id, x, y, width, height, color) {
        super(x, y, width, height, color);
        this.id = id;

        this.color = 'red';
        this.maxHealth = 100;
        this.health = 100;
        this.attack = 50;
        this.currentInhabitedTile = undefined;
        this.initialSpeed = 75;
        this.speed = 75;
        this.maxSpeed = 250;
        this.knockback = 15;
        this.startingAttackDelay = 300;
        this.attackDelay = 300;
        this.target = undefined;
        this.pathToPlayer = [];
        this.statBoosts = {
            health: 10,
            speed: 10,
            attack: 5,
            attackSpeed: 1,
        }
    }

    update(dt, now, gameStateHandler) {

        this.resetVelocity();

        if (getDistanceBetweenPoints(this.x, this.y, gameStateHandler.entities['player'].x, gameStateHandler.entities['player'].y) < 55) {
            this.enemyAttack(gameStateHandler.entities['player'], dt);
        }

        this.move(dt);

        for (const entity in gameStateHandler.entities) {
            if (Object.hasOwnProperty.call(gameStateHandler.entities, entity)) {
                this.collision(gameStateHandler, gameStateHandler.entities[entity]);
            }
        }

        
        if (intersectRect(this, gameStateHandler.entities['player'].attackBox)) {
            this.onAttacked(gameStateHandler.entities['player']);
        }


    };

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
}















