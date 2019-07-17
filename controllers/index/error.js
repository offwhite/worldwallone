const mongoose = require('mongoose')

const error = function(req, res, next){
  res.render('error')
}

module.exports = error
