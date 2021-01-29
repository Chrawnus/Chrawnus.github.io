import { Player } from "../components/entities/player.js";
import { CircleGraphics } from "../components/entities/circleGraphics.js";
import { Pellets } from "../components/entities/pellets.js";
import { Enemy } from "../components/entities/enemy.js";
import { PathHandler } from "../components/entities/pathHandler.js";
import { HelperFunctions } from "../components/utils/helperFunctions.js";
import { Score } from "../components/utils/scoreDisplay.js";
import { Health } from "../components/utils/healthDisplay.js";

let helper = new HelperFunctions();
let graphicsHandler;

let player;
let pellet;
let enemy;

let enemyPathHandler = new PathHandler(90, 30);

let scoreText = "Score: "
let scoreNumber = 0;

let health;
let score;

let distance;
let enemyDist;
let playerToPelletDist;
let enemyToPelletDist;

let pointer;
let screenObj;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })

  }



  create() {
    screenObj = this.sys.game.scale.gameSize;

    graphicsHandler = new CircleGraphics(this);
    this.add.existing(graphicsHandler)

    enemy = new Enemy(this, helper.getRandomInt(0, screenObj.width - 5), helper.getRandomInt(0, screenObj.height - 5), 15, 0xff00ff, 1.0);
    this.add.existing(enemy);
    graphicsHandler.addEntity(enemy);


    score = new Score(this, 600, 25, scoreText, { fontFamily: 'Arial', fontSize: 32, color: '#ffff00' });
    this.add.existing(score);

    

    player = new Player(this, 400, 300, 16, 0xff0000, 1);
    this.add.existing(player)

    health = new Health(this, 30, 25, "Health: ", { fontFamily: 'Arial', fontSize: 32, color: '#ffff00' }, player.health); 

    pellet = new Pellets(this, helper.getRandomInt(180, screenObj.width - 180), helper.getRandomInt(180, screenObj.height - 180), 5, 0x00ff00, 1.0);
    this.add.existing(pellet)



    graphicsHandler.addEntity(pellet);
    graphicsHandler.addEntity(player);


    pointer = this.input.mousePointer;

    helper.overlapFunction(this, pellet, player, enemy, screenObj, enemyPathHandler, score, scoreNumber, health);
    
    this.physics.add.overlap(player, enemy, () => {
      if(player.health > 0) {
        player.health -= 1;
        health.update(player.health);
      }
      
      
    });

    enemyPathHandler.circleAround(pellet, enemy);

  }

  update() {

    for (let i = 0; i < graphicsHandler.entities.length; i++) {
      graphicsHandler.entities[i].update();

    }

  
    distance = Phaser.Math.Distance.BetweenPoints(player.position, { x: pointer.worldX, y: pointer.worldY });

    if (pointer.isDown) {
      this.physics.moveToObject(player, { x: pointer.worldX, y: pointer.worldY }, player.velocity / (1 / distance), 150);
    }



    enemyDist = Phaser.Math.Distance.BetweenPoints(enemy.position, enemyPathHandler.path[0]);
    playerToPelletDist = Phaser.Math.Distance.BetweenPoints(enemy.position, pellet.position);
    enemyToPelletDist = Phaser.Math.Distance.BetweenPoints(enemy.position, pellet.position);


    if (enemyDist < 5) {
      enemyPathHandler.firstCoordtoLast();
    } else {
      this.physics.moveToObject(enemy, enemyPathHandler.path[0], enemy.velocity);
    }


    graphicsHandler.update();

  }
}







