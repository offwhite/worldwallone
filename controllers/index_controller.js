const ActionController = require('./action_controller.js')

class IndexController extends ActionController {
  constructor(){
    super()
    this.category = 'index'
  }

  index(req, res, next){ self.controller('index', req, res, next) }
  about(req, res, next){ self.controller('about', req, res, next) }
  error(req, res, next){ self.controller('error', req, res, next) }
}

const self = new IndexController

module.exports = self
