const theWall = function(req, res, next){
  res.render('index/the_wall', { sessionId: req.sessionID  })
}

module.exports = theWall
