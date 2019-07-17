const path = require('path')
const fs = require('fs')

const ActionController = class {
  // lazy load controllers
  controller(name, req, res, next){
    let contr = require('./'+this.category+'/'+name+'.js')
    contr(req, res, next)
  }
}


module.exports = ActionController;
