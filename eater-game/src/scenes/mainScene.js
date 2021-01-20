import { PhaserLogo } from "../components/phaserLogo.js";
import { PhaserText } from "../components/phaserText.js";
import { Player } from "../components/sprites/player.js";

let player;

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })

  }



  create() {
    //new PhaserText(this);
    //new PhaserLogo(this);
    player = new Player(this, 400, 300, 32, 0xff0000, 1);
    this.add.existing(player);
    
    

  }

  update() {
    player.update();

  }
}
