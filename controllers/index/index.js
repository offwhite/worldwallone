const mongoose = require('mongoose')

const index = function(req, res, next){
  res.render('index', { title: 'World Wall 1', message: 'Index' })
}

module.exports = index
