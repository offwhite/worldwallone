const mongoose = require('mongoose')

const get = function(req, res, next){
  let since = req.params.since
  const Mark = mongoose.model('Mark')
  Mark.find(
    {
      createdAt: { $gt: since},
      sessionId: { $ne: req.sessionID }
    },
    function (err, results) {
    res.send({ marks: results })
  })
}

module.exports = get
