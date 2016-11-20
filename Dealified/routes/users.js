var express = require('express');
var router = express.Router();
var mongo = require('./mongo');
var redis = require('redis'); //Redis
var client = redis.createClient(); // create a new redis client
var changes = require('./routes/changes');
mongo.connect(function(_db){
  db = _db;
});
var RETHINK_DATABASE= "delified";
var RETHINK_TABLE = "products";

var finalResult={};


 /* POST the Alert data from the UI
  * There are two conditions:
  *
  *  Condition A: if the data is not present, we insert into the redis.
  *  Condition A(2): Send a notification to be watched by RethinkDB.
  *  Condition B: if data is present, we append to the existing record.
  *
  */

router.post('/searchData', function(req, res) {

  var data = req.body;
  var newData=[];
  var product = data.tags[0].toLowerCase();

  // finalResult[product] = newData;
  // newData.push(data);

  client.get(product, function(err, result){

    if(result){
      console.log("result present"+result);
      finalResult[product].push(data);

    }
    else {
      //Insert into Redis
      console.log("Empty ruleset, inserting into DB");
      finalResult[product] = newData;
      newData.push(data);
      client.setex(product, 6000000, JSON.stringify(finalResult));
      changes.watch(product, RETHINK_DATABASE, RETHINK_TABLE);
    }

  });

  res.sendStatus(200);
});

module.exports = router;
