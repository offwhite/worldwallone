const mongoose = require('mongoose')

const about = function(req, res, next){
  const Mark = mongoose.model('Mark')
  Mark.find({}, function (err, results) {
    res.render('marks/add', { title: 'World Wall 1', marks: results })
  })
}

module.exports = about
