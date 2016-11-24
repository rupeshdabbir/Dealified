/**
 * Created by rdabbir on 11/20/16.
 */


var accountSid = process.env.TWILIO_SID_TEST; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_TOKEN_TEST;   // Your Auth Token from www.twilio.com/console
var redis = require('redis'); //Redis
var client = redis.createClient(); // create a new redis client
var twilio = require('twilio');
//var client = new twilio.RestClient(accountSid, authToken);
var _ = require('underscore');
var smsFree = require('./smsService');
var async = require('async');

function computeUserSMSNotif(product, productUrl, price){

  console.log("[SMS]: Proudct for email is: " +product);
  client.get(product, function(err, result){
    if(err)
      console.log(err);

    var parsedResult = JSON.parse(result);
    if([product] != '') {

      var users = _.filter(parsedResult[product], function (user) {
        return user.sms == true;
      });

      console.log("[SMS]: In SMS Service: " + users);

      _.each(users, function (userData) {
        parseInt(price) < parseInt(userData.priceRange) ? smsFree.sendSMSFree(userData.phone, productUrl).then(function () {
          console.log("SMS Sent!");
        }) : console.log("[SMS]: Price did not meet criteria. SMS not sent!");
      });
      console.log("[SMS]Redis UserDB for SMS: " + result);
    }
    else{
      console.log("[SMS] nO Product");
    }
  });

}

exports.sendSMS = function(alert){

  var message = JSON.parse(alert.toString());
  var product = Object.keys(message)[0];
  var productUrl = message[product].href;
  var price = message[product].price.trim();
  var priceSplit = price.split("$")[1];
  computeUserSMSNotif(product, productUrl, priceSplit);

  //console.log(message);

  //console.log("Sending SMS...!!");

// client.messages.create({
//    body: productUrl,
//    to: '+19139536869',  // Text this number
//    from: '+19132861044' // From a valid Twilio number
// }, function(err, message) {
//   if(err) {
//     console.error(err.message);
//   }
//
//   console.log(message);
//
// });
}
