import { getKey, keyCodes } from "./input.js";
import { AttackBox } from "./playerAttackBox.js";

export const player = {
    x: 0,
    y: 0,
    width: 32 * 0.8,
    height: 32 * 0.8,
    maxHealth: 100,
    health: 100,
    initialAttack: 2.5,
    attack: 5,
    currentInhabitedTile: undefined,
    color: 'lime',
    speed: 150,
    storedAttacks: 4,
    startingAttackDelay: 500,
    attackDelay: 500,
    vx: 0,
    vy: 0,
    inputBuffer: [],
    attackBox: new AttackBox(),
};

export function updatePlayer(dt) {

    player.vx = 0;
    player.vy = 0;


    if (player.health > 0) {
        playerMove(dt);
        playerAttack(dt);
        player.attackBox.update(dt, player);
        inputBufferUpdate(dt);
    }

};

function playerMove(dt) {
    player.vy -= getKey(keyCodes.w) || getKey(keyCodes.W) ? player.speed * dt : 0;
    player.vx -= getKey(keyCodes.a) || getKey(keyCodes.A) ? player.speed * dt : 0;
    player.vy += getKey(keyCodes.s) || getKey(keyCodes.S) ? player.speed * dt : 0;
    player.vx += getKey(keyCodes.d) || getKey(keyCodes.D) ? player.speed * dt : 0;
}

function playerAttack(dt) {

    // multidirectional attack
    if (player.inputBuffer.length < player.storedAttacks && getKey(keyCodes.shift)) {
        checkAttackDirection();   
    }

    // regular attack
    if (player.inputBuffer.length < 1 && !getKey(keyCodes.shift)) {
        checkAttackDirection();
    }

    function checkAttackDirection() {
        getKey(keyCodes.arrowUp) ? storeInput('arrowUp') : 0;
        getKey(keyCodes.arrowRight) ? storeInput('arrowRight') : 0;
        getKey(keyCodes.arrowDown) ? storeInput('arrowDown') : 0;
        getKey(keyCodes.arrowLeft) ? storeInput('arrowLeft') : 0;
    }

    function storeInput(slashDirection) {
        if (!player.inputBuffer.includes(slashDirection)) {
            player.inputBuffer.push(slashDirection);
            player.attackDelay = player.startingAttackDelay;
        } else {
            return;
        }
    }
}

function inputBufferUpdate(dt) {
    if (player.inputBuffer.length > 0 && player.attackBox.isActive === false) {
        if (player.attackDelay > 0) {
            player.attackDelay -= dt * 1000;
        } else if (player.attackDelay <= 0 && !getKey(keyCodes.shift)) {
            player.attackBox.create(player.inputBuffer[0], player);
            player.inputBuffer.splice(0, 1);
        }
        if (player.inputBuffer.length === 0) {
            player.attackDelay = player.startingAttackDelay;
        }
    }
}




