/// <reference path="../defs/phaser.d.ts" />

import { PreloadScene } from "../src/scenes/preloadScene.js";
import { MainScene } from "../src/scenes/mainScene.js";



const config = {
  type: Phaser.AUTO,
  backgroundColor: '#cdcdcd',
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
},
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
    parent: 'phaser-example'
  },
  
  scene: [PreloadScene, MainScene],
  
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})

