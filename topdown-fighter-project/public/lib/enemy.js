import { AttackBox } from "./AttackBox.js";
import { Entity } from "./Entity.js";
import { determineAttackDirection, getDistanceBetweenPoints, intersectRect } from "./helperFunctions.js";

export class Enemy extends Entity {
    constructor(id, x, y, width, height, color) {
        super(x, y, width, height, color);
        this.id = id;

        this.color = 'red';
        this.maxHealth = 100;
        this.health = 100;
        this.attack = 5;
        this.currentInhabitedTile = undefined;
        this.initialSpeed = 75;
        this.speed = 50;
        this.maxSpeed = 100;
        this.knockback = 15;
        this.startingAttackDelay = 300;
        this.attackDelay = 300;
        this.target = undefined;
        this.pathToPlayer = [];
        this.attackBox = new AttackBox();
        this.statBoosts = {
            health: 10,
            speed: 5,
            attack: 0.5,
            attackSpeed: 1,
        }
    }

    update(dt, entityHandler, worldHandler) {

        if (getDistanceBetweenPoints(this.x, this.y, entityHandler.entities['player'].x, entityHandler.entities['player'].y) < 55) {
            this.enemyAttack(entityHandler.entities['player'], dt);
        }
        if (this.attackBox.isActive) {
            this.attackBox.update(dt, this);
        }
        this.move(dt);

        for (const entity in entityHandler.entities) {
            if (Object.hasOwnProperty.call(entityHandler.entities, entity)) {
                this.collision(worldHandler, entityHandler.entities[entity]);
            }
        }

        
        if (intersectRect(this, entityHandler.entities['player'].attackBox)) {
            this.onAttacked(entityHandler.entities['player'], dt*20);
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
            
            const direction = determineAttackDirection(this, player);
            this.attackBox.create(direction, this);
        }
    }

    onAttacked(entity, dt) {
        if (this.health > 0) {
            this.health -= entity.attack;
            this.knockBackFunction(entity.attackBox.direction, entity.knockback, dt)
        }

    }

    knockBackFunction(attackDirection, knockback, dt) {

        this.vy -= attackDirection === 'Up' ? knockback * dt : 0;
        this.vy += attackDirection === 'Down' ? knockback * dt : 0;
        this.vx -= attackDirection === 'Left' ? knockback * dt : 0;
        this.vx += attackDirection === 'Right' ? knockback * dt : 0;

        return;
    }
}















