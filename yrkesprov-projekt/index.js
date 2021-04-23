const gui = require('gui')

if (!process.versions.yode) {
  gui.MessageLoop.run()  // block until gui.MessageLoop.quit() is called
  process.exit(0)
}