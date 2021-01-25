import { Player } from "../components/entities/player.js";
import { CircleGraphics } from "../components/entities/circleGraphics.js";
import { Pellets } from "../components/entities/pellets.js";



let graphicsHandler;

let player;
let pellet;

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

    player = new Player(this, 400, 300, 16, 0xff0000, 1);
    this.add.existing(player)

    pellet = new Pellets(this, getRandomInt(0, screenObj.width - 5), getRandomInt(0, screenObj.height - 5), 5, 0x00ff00, 1.0);
    this.add.existing(pellet)



    graphicsHandler.addEntity(pellet);
    graphicsHandler.addEntity(player);



    cursors = this.input.keyboard.createCursorKeys();
    pointer = this.input.mousePointer;

    recursiveCollision(this);

  }

  update() {

    player.update();
    pellet.update();

    distance = Phaser.Math.Distance.BetweenPoints(player.position, { x: pointer.worldX, y: pointer.worldY });

    if (pointer.isDown) {
      this.physics.moveToObject(player, { x: pointer.worldX, y: pointer.worldY }, player.velocity / (1 / distance), 150);
    }


    graphicsHandler.update();

  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function recursiveCollision(scene) {
  scene.physics.add.overlap(player, pellet, () => {
    
    pellet.destroy()
    graphicsHandler.destroyEntity(player, pellet)
    player.restoreHealth();

    pellet = new Pellets(scene, getRandomInt(0, screenObj.width - 5), getRandomInt(0, screenObj.height - 5), 5, 0x00ff00, 1.0);
    scene.add.existing(pellet)
    graphicsHandler.addEntity(pellet);
    recursiveCollision(scene);
  })
}


