const ActionController = require('./action_controller.js')

class IndexController extends ActionController {
  index(req, res, next){ controller.controllers['index'](req, res, next) }
  about(req, res, next){ controller.controllers['about'](req, res, next) }
  error(req, res, next){ controller.controllers['error'](req, res, next) }
}

const controller = new IndexController

module.exports = controller
