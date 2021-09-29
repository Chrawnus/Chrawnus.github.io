export class GameStateHandler {
    constructor() {

    }

    onGameOver() {
        this.entities['player'].updateDeaths();
        this.resetPlayerPos();
        this.resetEnemyPos();
    }

    gameOverCheck(entityHandler) {
        return entityHandler.entities['player'].health < 0;
    }
    
    checkEnemyState(entityHandler) {
        return entityHandler.entities['enemy'].health <= 0
    };



}
