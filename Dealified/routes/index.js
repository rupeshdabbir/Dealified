var express = require('express');
var crawler = require('./crawler');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var NanoTimer = require('nanotimer');

var timerObject = new NanoTimer();


var router = express.Router();

/* GET home page. */
router.get('/', function(req,res){

    // var microsecs = timerObject.time(crawler.data, '', 'u');
    // console.log(microsecs);
    // crawler.crawl();
    
    res.render('index');
  // res.render('index', { title:  });
  //
  // 
  // });
    
    
    // res.status(200).json({json:'hello'});
});

router.get('/getData', crawler.getData

   // if(req.body.username =='Sid'){
   //     if(req.body.password =="test"){
   //
   //         var token = jwt.sign({username : req.body.username}, "rdabbir12121");
   //
   //         res.status(200).json(token);
   //
   //     }
   // }

// }

);




module.exports = router;
