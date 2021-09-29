export class EntityHandler {
    constructor() {
        this.entities = {}; 
    }

    initialize(worldHandler, ...entities) {
        this.addEntities(...entities);
        this.setPlayerStartPosition(worldHandler);
        this.setEnemyStartPosition(worldHandler);
        this.placePlayer(worldHandler);
        this.placeEnemy(worldHandler);
    }

    addEntity(entity) {
        this.entities[entity.id] = entity;
    }

    addEntities(...entities) {
        entities.forEach(entity => {
            this.addEntity(entity);
        });

    }

    getEntityPosOnTileGrid(entity, tileGrid) {
        for (let i = 0; i < tileGrid.length; i++) {
            const tile = tileGrid[i];
            
            if ((entity.x + entity.width / 2 > tile.x &&
                entity.x + entity.width / 2 < tile.x + tile.width &&
                entity.y + entity.height / 2 > tile.y &&
                entity.y + entity.height / 2 < tile.y + tile.height)) {
                entity.currentInhabitedTile = i;
            }
        }
    }

    placePlayer() {
        this.entities['player'].x = this.entities['player'].startPos.x;
        this.entities['player'].y = this.entities['player'].startPos.y;
    };

    placeEnemy() {
        this.entities['enemy'].x = this.entities['enemy'].startPos.x;
        this.entities['enemy'].y = this.entities['enemy'].startPos.y;
    };

    setPlayerStartPosition(worldHandler) {
        const { x, y } = this.determinePosition(worldHandler, 4, 2);
        this.setPosition(x, y, this.entities['player'].startPos);
    };

    setEnemyStartPosition(worldHandler) {
        const { x, y } = this.determinePosition(worldHandler, 1.35, 2);
        this.setPosition(x, y, this.entities['enemy'].startPos);
    };

    resetPlayerPos() {
        this.placePlayer();
        this.entities['player'].health = this.entities['player'].maxHealth;
        this.entities['player'].attack = this.entities['player'].initialAttack;
    };

    resetEnemyPos() {
        this.placeEnemy();
        this.entities['enemy'].health = this.entities['enemy'].maxHealth;
    };

    setPosition(x, y, entityStartPos) {
        entityStartPos.x = x;
        entityStartPos.y = y;
    }

    determinePosition(worldHandler, hor, ver) {
        const x = worldHandler.worldComponents[0][Math.floor(Math.sqrt(worldHandler.world.tileGridSize) / hor)].x;
        const y = worldHandler.worldComponents[0][Math.floor(worldHandler.world.tileGridSize / ver)].y;
        return { x, y };
    }

    getEnemyPosition(worldHandler) {
        this.getEntityPosOnTileGrid(this.entities['enemy'], worldHandler.worldComponents[0]);
    }

    getPlayerPosition(worldHandler) {
        this.getEntityPosOnTileGrid(this.entities['player'], worldHandler.worldComponents[0]);
    }
}