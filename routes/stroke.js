var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is a stroke get');
});

router.get('/from/:timestamp', function(req, res, next) {
  res.send('get strokes from: ' + req.params.timestamp);
});

module.exports = router;
