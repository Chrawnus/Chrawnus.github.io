import { Entity } from "./Entity.js";
import { getKey, keyCodes } from "./input.js";
import { AttackBox } from "./AttackBox.js";
import { intersectRect } from "./helperFunctions.js";

// Player class

export class Player extends Entity {
    constructor(id, x, y, width, height, color) {
        super(x, y, width, height, color);
        this.id = id;
        this.maxHealth = 100;
        this.health = 100;
        this.initialAttack = 2.5;
        this.attack = 5;
        this.currentInhabitedTile = undefined;
        this.speed = 100;
        this.storedAttacks = 4;
        this.startingAttackDelay = 500;
        this.attackDelay = 500;
        this.inputBuffer = [];
        this.attackBox = new AttackBox();
        this.knockback = 150;
        this.statistics = {
            kills: 0,
            deaths: 0,
            statPoints: 0,
            expendedStatPoints: {
                health: 0,
                healing: 0,
                speed: 0,
                attack: 0,
                attackSpeed: 0
            }
        };
        this.statBoosts = {
            health: 20,
            healing: 10,
            speed: 10,
            attack: 10,
            attackSpeed: 45,
        };
    }

    update(dt, entityHandler, worldHandler) {
        this.friction(dt);

        if (this.health > 0) {
            
            if (intersectRect(this, entityHandler.entities['enemy'].attackBox))
                this.onAttacked(entityHandler.entities['enemy'], dt);

            this.move(dt);
            
            // allow attacking when not in knockedback state, 
            // otherwise update elapsed and call recover function until
            // no longer knockedback.
            if (!this.knockedBack) {
                this.attackFunction();
            } else {
                this.elapsed += dt;
                this.recover();
            }

            // update input buffer.
            this.inputBufferUpdate(dt);
            if (this.attackBox.isActive) 
                this.attackBox.update(dt, this);

        }

        // collision handling.
        for (const entity in entityHandler.entities) {
            if (Object.hasOwnProperty.call(entityHandler.entities, entity)) {
                this.collision(worldHandler, entityHandler.entities[entity]);
            }
        }


    }

    // movement handling
    move(dt) {
        this.vy -= getKey(keyCodes.w) || getKey(keyCodes.W) ? this.speed * dt : 0;
        this.vx -= getKey(keyCodes.a) || getKey(keyCodes.A) ? this.speed * dt : 0;
        this.vy += getKey(keyCodes.s) || getKey(keyCodes.S) ? this.speed * dt : 0;
        this.vx += getKey(keyCodes.d) || getKey(keyCodes.D) ? this.speed * dt : 0;
    }

    // recover player health when called
    heal() {
        if (this.maxHealth - this.health >= this.statBoosts.healing) {
            this.health += this.statBoosts.healing;
        } else {
            this.health += this.maxHealth - this.health;
        }
    };

    // function that handles attacking
    attackFunction() {
        // multidirectional attack, if player is holding down shift 
        // and input buffer is not full,
        // store attack direction in input buffer.
        if (this.inputBuffer.length < this.storedAttacks && getKey(keyCodes.shift)) {
            this.checkAttackDirection();
        }

        // regular attack, store attack direction in input buffer.
        if (this.inputBuffer.length < 1 && !getKey(keyCodes.shift)) {
            this.checkAttackDirection();
        }
    }

    // Check which directional is being held down 
    // and store the info in the input buffer
    checkAttackDirection() {
        getKey(keyCodes.arrowUp) ? this.storeInput('arrowUp') : 0;
        getKey(keyCodes.arrowRight) ? this.storeInput('arrowRight') : 0;
        getKey(keyCodes.arrowDown) ? this.storeInput('arrowDown') : 0;
        getKey(keyCodes.arrowLeft) ? this.storeInput('arrowLeft') : 0;
    }

    // function to handle storing attacks in input buffer
    storeInput(slashDirection) {
        if (!this.inputBuffer.includes(slashDirection)) {
            this.inputBuffer.push(slashDirection);
            this.attackDelay = this.startingAttackDelay;
        } else {
            return;
        }
    }

    // function that updates input buffer. 
    // Decreases attackDelay until it is equal to or below
    // zero, after which it creates an attackbox based
    // on the attack direction stored at index 0, 
    // and then removes the first item in the input buffer array. 
    // if input buffer is empty, resets attackDelay.  
    inputBufferUpdate(dt) {
        if (this.inputBuffer.length > 0 && this.attackBox.isActive === false) {
            if (this.attackDelay > 0) {
                this.attackDelay -= dt * 1000;
            } else if (this.attackDelay <= 0 && !getKey(keyCodes.shift)) {
                this.attackBox.create(this.inputBuffer[0].slice(5), this);
                this.inputBuffer.splice(0, 1);
            }
            if (this.inputBuffer.length === 0) {
                this.attackDelay = this.startingAttackDelay;
            }
        }
    }

    increaseStatPoints() {
        this.statistics.statPoints += 1;
    }

    updateKills() {
        this.statistics.kills += 1;
    };

    updateDeaths() {
        this.statistics.deaths += 1;
    };

    onEnemyKill() {
        this.heal();
        this.increaseStatPoints();
        this.updateKills();
    }


}








