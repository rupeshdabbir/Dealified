/**
 * Created by rdabbir on 11/20/16.
 */


var accountSid = process.env.TWILIO_SID_TEST; // Your Account SID from www.twilio.com/console
var authToken = process.env.TWILIO_TOKEN_TEST;   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

exports.sendSMS = function(alert){

  var message = JSON.parse(alert.toString());

  console.log("Sending SMS...!!");

client.messages.create({
   body: message['product'].href,
  //body: "testHello",
  to: '+19139536869',  // Text this number
  from: '+19132861044' // From a valid Twilio number
}, function(err, message) {
  if(err) {
    console.error(err.message);
  }

  console.log(message);

});
}
