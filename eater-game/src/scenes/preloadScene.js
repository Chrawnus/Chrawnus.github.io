export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.baseURL = 'src/assets/';    
  }

  create() {
    this.scene.start('MainScene')
  }
}


