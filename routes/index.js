var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 // res.render('index', { title: 'Express' });
 //res.render('landingPageCT', { title: 'Express-CT' });
 //res.render('hosted', { title: 'Express-CT' });
  //res.render('merchie', { title: 'Express-CT' });
  res.render('scsdonate', { title: 'Express-CT' });
});

module.exports = router;
