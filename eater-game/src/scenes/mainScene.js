
import { PhaserLogo } from "../components/phaserLogo.js";
import { PhaserText } from "../components/phaserText.js";
import { Player } from "../components/sprites/player.js";
import { PlayerGraphics } from "../components/sprites/playerGraphics.js";

let player;
let playerGraphics;
let cursors;
let pointer;
let distance;
let screenObj;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })

  }



  create() {
    //new PhaserText(this);
    //new PhaserLogo(this);
    screenObj = this.sys.game.scale.gameSize;


    playerGraphics = new PlayerGraphics(this, 400, 300, 16, 0xff0000, 1);
    this.add.existing(playerGraphics);


    player = new Player(this, 400, 300, 16, 0xff0000, 1.0);
    player.addGraphicsObject(playerGraphics, this);
    cursors = this.input.keyboard.createCursorKeys();
    pointer = this.input.mousePointer;
    
  }

  update() {

    player.update();
    distance = Phaser.Math.Distance.BetweenPoints(player.position, {x: pointer.worldX, y: pointer.worldY});

    if (pointer.isDown) {
      this.physics.moveToObject(player, {x: pointer.worldX, y: pointer.worldY}, player.velocity/(1/distance));
    }


  }
}


function movementInput() {
  if (cursors.left.isDown) {
    player.setVelocityX(-player.velocity);
  }
  else if (cursors.right.isDown) {
    player.setVelocityX(player.velocity);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown) {
    player.setVelocityY(-player.velocity);
  } else if (cursors.down.isDown) {
    player.setVelocityY(player.velocity);
  } else {
    player.setVelocityY(0);
  }
}

