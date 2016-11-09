var express = require('express');
var router = express.Router();
var crawl = require('./crawler');
var cron = require('cron');
var cronJob = cron.job("5 * * * * *", crawl.crawl());
cronJob.start();


// var j = schedule.scheduleJob('* /10 * * *', crawl.crawl);

/* GET home page. */
router.get('/', function(req,res){
    res.render('index',{title:"Express"})
});


module.exports = router;
