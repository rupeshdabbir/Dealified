/**
 * Created by rdabbir on 11/20/16.
 */

var express = require('express');
var router = express.Router();
var mongo = require('./mongo');
var redis = require('redis'); //Redis
var client = redis.createClient(); // create a new redis client
var changes = require('./changes');
mongo.connect(function(_db){
  db = _db;
});
var RETHINK_DATABASE= "delified";
var RETHINK_TABLE = "products";



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
  console.log(data);
  var product = data.tags.toLowerCase();


  // finalResult[product] = newData;
  // newData.push(data);

  client.get(product, function(err, result){
    var resultTemp = {};
    var finalResult={};

    if(result){ //if it's already present in redis
      resultTemp = JSON.parse(result);
      console.log("Data already present. Appending the alert!");
      resultTemp[product].push(data);
      client.setex(product, 6000000, JSON.stringify(resultTemp));
    } else {
      //Insert into Redis
      console.log("Empty ruleset, inserting into DB");
      finalResult[product] = [];
      finalResult[product].push(data);
      client.setex(product, 6000000, JSON.stringify(finalResult));
      changes.watch(product, RETHINK_DATABASE, RETHINK_TABLE);
    }

  });

  res.sendStatus(200);
});

module.exports = router;
