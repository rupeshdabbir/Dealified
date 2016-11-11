var express = require('express');
var crawler = require('./crawler');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var router = express.Router();

/* GET home page. */
router.get('/', crawler.crawl
  // res.render('index', { title:  });
  //
  // 
  // });
    
    
    // res.status(200).json({json:'hello'});
);

router.post('/login', function(req,res){
   if(req.body.username =='Sid'){
       if(req.body.password =="test"){

           var token = jwt.sign({username : req.body.username}, "rdabbir12121");

           res.status(200).json(token);

       }
   }

});




module.exports = router;
