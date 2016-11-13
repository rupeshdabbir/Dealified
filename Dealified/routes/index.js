var express = require('express');
var crawler = require('./crawler');
var jwt = require('jsonwebtoken');
var NanoTimer = require('nanotimer');

var router = express.Router();

/* GET home page. */
// router.get('/', function(req,res){
//
//     // var microsecs = timerObject.time(crawler.data, '', 'u');
//     // console.log(microsecs);
//     // crawler.crawl();
//
//     res.render('index');
//   // res.render('index', { title:  });
//   //
//   //
//   // });


    // res.status(200).json({json:'hello'});
// });

router.get('/getData', crawler.getData);

router.post('/searchData', crawler.searchData);




module.exports = router;
