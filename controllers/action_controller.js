const path = require('path')
const fs = require('fs')

const actionController = class {
  constructor(){
    this.controllers = {}

    // load controllers
    const controlerDirs = path.join(__dirname, '/index')
    fs.readdirSync(controlerDirs)
      .filter(file => ~file.indexOf('.js'))
      .forEach(file => {
        let name = file.replace('.js','')
        this.controllers[name] = require(path.join(controlerDirs, file))
      })
  }
}


module.exports = actionController;
