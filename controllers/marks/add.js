const mongoose = require('mongoose')

const add = function(req, res, next){
  const Mark = mongoose.model('Mark')
  let params = req.body
  Mark.create(
    {
      sessionId: req.sessionID,
      pointsJson: JSON.stringify(params.points),
      color:      params.color,
      opacity:    params.opacity,
      brushSize:  params.brushSize,
      hardness:   params.hardness
    },
    function(err, mark){
      if(err){
        res.send('error: '+err)
      }else{
        res.send('success')
      }
    }
  )
}

module.exports = add
