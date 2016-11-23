/**
 * Created by rdabbir on 11/22/16.
 */
var redis = require('redis'); //Redis
var client = redis.createClient(); // create a new redis client

//Please check test.js for business logic
  client.get("vizio", function(err, result){
    if(err)
      console.log(err);

    console.log(result);
    _.filter()
  });

