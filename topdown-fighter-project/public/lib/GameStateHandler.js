
export class GameStateHandler {
    constructor() {

    }

    // reset player and enemy position on player death.
    onGameOver(entityHandler) {
        entityHandler.entities['player'].updateDeaths();
        entityHandler.resetPlayerPos();
        entityHandler.resetEnemyPos();
    }

    // check if conditions for Game Over has been met. 
    gameOverCheck(entityHandler) {
        return entityHandler.entities['player'].health <= 0;
    }
    
    // check if enemy is dead in order to give stat points to player and boost enemy stats and reset it's position
    checkEnemyState(entityHandler) {
        return entityHandler.entities['enemy'].health <= 0
    };



}
