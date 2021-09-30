export class GameStateHandler {
    constructor() {

    }

    onGameOver(entityHandler) {
        entityHandler.entities['player'].updateDeaths();
        entityHandler.resetPlayerPos();
        entityHandler.resetEnemyPos();
    }

    gameOverCheck(entityHandler) {
        return entityHandler.entities['player'].health <= 0;
    }
    
    checkEnemyState(entityHandler) {
        return entityHandler.entities['enemy'].health <= 0
    };



}
