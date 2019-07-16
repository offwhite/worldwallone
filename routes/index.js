var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello World!')
  //res.render('index', { title: 'Express' });
});

router.get('/moon', function(req, res, next) {
  res.send('Hello moon!')
  //res.render('index', { title: 'Express' });
});

router.get('*', function(req, res){
   res.send('this is a generic 404 page');
});

module.exports = router;
