import { PhaserLogo } from "../components/phaserLogo.js";
import { PhaserText } from "../components/phaserText.js";
import { Player } from "../components/sprites/player.js";


export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })

  }

  

  create() {
    new PhaserText(this);
    new PhaserLogo(this);
   
    
  }
}
