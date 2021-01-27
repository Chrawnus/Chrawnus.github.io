import { Player } from "../components/entities/player.js";
import { CircleGraphics } from "../components/entities/circleGraphics.js";
import { Pellets } from "../components/entities/pellets.js";
import { Enemy } from "../components/entities/enemy.js";
import { PathHandler } from "../components/entities/pathHandler.js";



let graphicsHandler;

let player;
let pellet;
let enemy;



let enemyPathHandler = new PathHandler(90, 30);



let enemyDist;


let cursors;
let pointer;
let distance;

let screenObj;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })

  }



  create() {
    screenObj = this.sys.game.scale.gameSize;

    graphicsHandler = new CircleGraphics(this);
    this.add.existing(graphicsHandler)

    enemy = new Enemy(this, getRandomInt(0, screenObj.width - 5), getRandomInt(0, screenObj.height - 5), 15, 0xff00ff, 1.0);
    this.add.existing(enemy);
    graphicsHandler.addEntity(enemy);





    player = new Player(this, 400, 300, 16, 0xff0000, 1);
    this.add.existing(player)

    pellet = new Pellets(this, getRandomInt(180, screenObj.width - 180), getRandomInt(180, screenObj.height - 180), 5, 0x00ff00, 1.0);
    this.add.existing(pellet)



    graphicsHandler.addEntity(pellet);
    graphicsHandler.addEntity(player);



    cursors = this.input.keyboard.createCursorKeys();
    pointer = this.input.mousePointer;

    overlapFunction(this);
    this.physics.add.collider(player, enemy);

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

      
    if (enemyDist < 5) {
      enemyPathHandler.firstCoordtoLast();
    } else {
      this.physics.moveToObject(enemy, enemyPathHandler.path[0], enemy.velocity);
    }


    graphicsHandler.update();

  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function overlapFunction(scene) {
  scene.physics.add.overlap(player, pellet, () => {

    player.restoreHealth();
    enemyPathHandler.path.length = 0;
    pellet.x = getRandomInt(180, screenObj.width - 180)
    pellet.y = getRandomInt(180, screenObj.height - 180)
    enemyPathHandler.circleAround(pellet, enemy);
  })
}



