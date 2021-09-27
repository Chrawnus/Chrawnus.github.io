import { getKey, keyCodes } from "./input.js";
import { moveCollideX, moveCollideY } from "./physics.js";
import { AttackBox } from "./playerAttackBox.js";

export class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 32 * 0.8;
        this.height = 32 * 0.8;
        this.maxHealth = 100;
        this.health = 100;
        this.initialAttack = 2.5;
        this.attack = 5;
        this.currentInhabitedTile = undefined;
        this.color = 'lime';
        this.speed = 150;
        this.storedAttacks = 4;
        this.startingAttackDelay = 500;
        this.attackDelay = 500;
        this.vx = 0;
        this.vy = 0;
        this.inputBuffer = [];
        this.attackBox = new AttackBox();
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

    update(dt, initializer) {

        this.vx = 0;
        this.vy = 0;


        if (this.health > 0) {
            this.move(dt);

            this.attackFunction();
            this.attackBox.update(dt, this);
            this.inputBufferUpdate(dt);
        }

        moveCollideX(this.vx, this, initializer.walls, this.onCollideX);
        moveCollideY(this.vy, this, initializer.walls, this.onCollideY);
    }

    move(dt) {
        this.vy -= getKey(keyCodes.w) || getKey(keyCodes.W) ? this.speed * dt : 0;
        this.vx -= getKey(keyCodes.a) || getKey(keyCodes.A) ? this.speed * dt : 0;
        this.vy += getKey(keyCodes.s) || getKey(keyCodes.S) ? this.speed * dt : 0;
        this.vx += getKey(keyCodes.d) || getKey(keyCodes.D) ? this.speed * dt : 0;
    }

    heal() {
        if (this.maxHealth - this.health >= this.statBoosts.healing) {
            this.health += this.statBoosts.healing;
        } else {
            this.health += this.maxHealth - this.health;
        }
    };


    attackFunction() {
        // multidirectional attack
        if (this.inputBuffer.length < this.storedAttacks && getKey(keyCodes.shift)) {
            this.checkAttackDirection();
        }
        // regular attack
        if (this.inputBuffer.length < 1 && !getKey(keyCodes.shift)) {
            this.checkAttackDirection();
        }
    }

    checkAttackDirection() {
        getKey(keyCodes.arrowUp) ? this.storeInput('arrowUp') : 0;
        getKey(keyCodes.arrowRight) ? this.storeInput('arrowRight') : 0;
        getKey(keyCodes.arrowDown) ? this.storeInput('arrowDown') : 0;
        getKey(keyCodes.arrowLeft) ? this.storeInput('arrowLeft') : 0;
    }

    storeInput(slashDirection) {
        if (!this.inputBuffer.includes(slashDirection)) {
            this.inputBuffer.push(slashDirection);
            this.attackDelay = this.startingAttackDelay;
        } else {
            return;
        }
    }

    inputBufferUpdate(dt) {
        if (this.inputBuffer.length > 0 && this.attackBox.isActive === false) {
            if (this.attackDelay > 0) {
                this.attackDelay -= dt * 1000;
            } else if (this.attackDelay <= 0 && !getKey(keyCodes.shift)) {
                this.attackBox.create(this.inputBuffer[0], this);
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

    onCollideX(rect, otherRect) {
        rect.vx = 0;
        return true;
    }
    
    onCollideY(rect, otherRect) {
        rect.vy = 0;
        return true;
    }
}








