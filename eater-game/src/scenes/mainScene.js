import { Player } from "../components/entities/player.js";
import { CircleGraphics } from "../components/entities/circleGraphics.js";
import { Pellets } from "../components/entities/pellets.js";
import { Enemy } from "../components/entities/enemy.js";




let graphicsHandler;

let player;
let pellet;


let enemy;

let dist;


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

    pellet = new Pellets(this, getRandomInt(0, screenObj.width - 5), getRandomInt(0, screenObj.height - 5), 5, 0x00ff00, 1.0);
    this.add.existing(pellet)



    graphicsHandler.addEntity(pellet);
    graphicsHandler.addEntity(player);



    cursors = this.input.keyboard.createCursorKeys();
    pointer = this.input.mousePointer;

    recursiveCollision(this);
    this.physics.add.collider(player, enemy);
    

  //  By adjusting the radius you can create a spiral effect

  }

  update() {
   
    for (let i = 0; i < graphicsHandler.entities.length; i++) {
      graphicsHandler.entities[i].update();
      
    }

    dist = Phaser.Math.Distance.BetweenPoints(enemy.position, pellet.position); 
    Phaser.Actions.RotateAroundDistance(enemy, {x: pellet.x, y: pellet.y}, 0.02, dist);

    distance = Phaser.Math.Distance.BetweenPoints(player.position, { x: pointer.worldX, y: pointer.worldY });

    if (pointer.isDown) {
      this.physics.moveToObject(player, { x: pointer.worldX, y: pointer.worldY }, player.velocity / (1 / distance), 150);
    }
    this.physics.moveToObject(enemy, player, 250);

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



