const mongoose = require('mongoose')

const error = function(req, res, next){
  res.render('index/error')
}

module.exports = error
