var express = require('express');
var router = express.Router();
var mongo = require('./mongo');
var redis = require('redis'); //Redis
var client = redis.createClient(); // create a new redis client
mongo.connect(function(_db){
  db = _db;
});

var finalResult={};
var newData=[];


/* GET users listing. */
router.post('/searchData', function(req, res) {

  var data = req.body;
  var product = data.tags[0].toLowerCase();

  finalResult[product] = newData;
  newData.push(data);

  //Insert into Redis
  client.setex(product, 6000000, JSON.stringify(finalResult));

  res.sendStatus(200);
});

module.exports = router;
