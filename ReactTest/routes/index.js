var express = require('express');
var schedule = require('node-schedule');
var crawler = require('./crawler');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

  var j = schedule.scheduleJob('*/1 * * *', function(){
      crawler.crawl();
  });

});

module.exports = router;
