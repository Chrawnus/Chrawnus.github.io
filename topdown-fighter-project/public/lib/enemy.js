import { AttackBox } from "./AttackBox.js";
import { Entity } from "./Entity.js";
import { determineAttackDirection, getDistanceBetweenPoints, intersectRect } from "./helperFunctions.js";

// Class to handle creation and updating of enemy entit(y/ies)

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
        this.knockback = 150;
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

    // update function to get distance to player 
    // in order to determine whether to attack,
    // updates attached attackBox, handles
    // movement, collision with other entities and onAttacked events. 
    update(dt, entityHandler, worldHandler) {
        const entities = entityHandler.entities;
        const player = entities['player'];

        this.friction(dt);

        if (intersectRect(this, player.attackBox))
            this.onAttacked(player, dt);

        if (!this.hasAttacked) {
            if (getDistanceBetweenPoints(this.x, this.y, player.x, player.y) < 55)
            {
                this.enemyAttack(player, dt);
                this.hasAttacked = true;
            }
        } else {
            this.attackCooldown += dt;
            this.resetAttackCooldown();
        }


        if (!this.knockedBack) {
            this.move(dt, player);

        } else {
            this.elapsed += dt;
            this.recover();
        }

        if (this.attackBox.isActive)
            this.attackBox.update(dt, this);

        for (const entity in entities) {
            if (Object.hasOwnProperty.call(entities, entity)) {
                this.collision(worldHandler, entities[entity]);
            }
        }



    };

    resetAttackCooldown() {
        if (this.attackCooldown > 0.5) {
            this.hasAttacked = false;
            this.attackCooldown = 0;
        }
    }

    // Function to handle movement logic. 
    move(dt) {
        // If pathToPlayer exist, and enemy has not arrived 
        // at tile inhabitated by player, 
        // set last item in pathToPlayer array as next 
        // target tile for enemy to move towards.
        if (!(this.pathToPlayer === undefined) && this.pathToPlayer.length > 1) {
            let nextTileIndex = this.pathToPlayer.length - 1;
            let target = this.pathToPlayer[nextTileIndex];


            var { enemyX, enemyY, targetX, targetY } = getCoordinates(target, this);

            // Get delta x and delta y between
            // target tile coordinates and enemy coordinates
            // and determine movement direction
            const dx = targetX - enemyX;
            const dy = targetY - enemyY;
            const angle = Math.atan2(dy, dx)

            // move enemy in the determined direction
            this.vx = this.speed * Math.cos(angle) * dt;
            this.vy = this.speed * Math.sin(angle) * dt;

            // If enemy gets sufficiently close to target tile, 
            // remove target tile from pathToPlayer array and exit function.
            if (getDistanceBetweenPoints(enemyX, enemyY, targetX, targetY) < target.width / 2) {
                if (this.pathToPlayer.length > 2) {
                    this.pathToPlayer.splice(nextTileIndex, 1);
                    return;
                }
            }
        }

        function getCoordinates(target, enemy) {
            const enemyX = enemy.x + enemy.width / 2;
            const enemyY = enemy.y + enemy.height / 2;
            let targetX = target.x + target.width / 2;
            let targetY = target.y + target.height / 2;
            return { enemyX, enemyY, targetX, targetY };
        }
    }

    boostStats() {
        this.maxHealth += this.statBoosts.health;
        this.speed < this.maxSpeed ? this.speed += this.statBoosts.speed :
            this.speed > this.maxSpeed ? this.speed = this.maxSpeed : 0;
        this.attack += this.statBoosts.attack;
    }

    // Function to handle attack logic
    enemyAttack(player) {
        // if player is not dead, call helper function 
        // to determine attack direction,
        // then initialize attackBox passing given direction
        // as parameter. 
        if (player.health > 0) {
            const direction = determineAttackDirection(this, player);
            this.attackBox.create(direction, this);

        }
    }
}
