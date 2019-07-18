const ActionController = require('./action_controller.js')

class MarksController extends ActionController {
  constructor(){
    super()
    this.category = 'marks'
  }

  get(req, res, next){ self.controller('get', req, res, next) }
  add(req, res, next){ self.controller('add', req, res, next) }
}

const self = new MarksController

module.exports = self
