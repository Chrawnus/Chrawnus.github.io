export class HelperFunctions {
    constructor(){

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      }

      overlapFunction(scene, target, player, enemy, canvas, pathhandler, score, scoreNumber, health) {
        scene.physics.add.overlap(player, target, () => {
            scoreNumber += 10;
            score.update(scoreNumber);
            player.restoreHealth();
            health.update(player.health);
            if (enemy.velocity < enemy.maxVel) {
                enemy.velocity += 5;
            }

            target.x = this.getRandomInt(180, canvas.width - 180)
            target.y = this.getRandomInt(180, canvas.height - 180)
            pathhandler.circleAround(target, enemy);
        })
    }
}