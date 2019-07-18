const mongoose = require('mongoose')

const about = function(req, res, next){
  const Mark = mongoose.model('Mark')
  Mark.remove({}, function(){console.log('done')})
  Mark.find({}, function (err, results) {
    console.log(results)
    res.render('index/about', { title: 'World Wall 1', marks: results })
  })
}

module.exports = about
