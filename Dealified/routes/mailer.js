/**
 * Created by Rupesh Dabbir && Nrsimha on 11/18/16.
 */
var nodemailer = require('nodemailer');
var redis = require('redis'); //Redis
var client = redis.createClient(); // create a new redis client
var _ = require('underscore');
var compiledHTML = require('./emailHTML');


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

function computeUserEmailNotif(product, productUrl, price){

  //console.log("[Email]: Product for email is: " +product);
  client.get(product, function(err, result){
    if(err)
      console.log(err);

    var parsedResult = JSON.parse(result);

    // var filteredUserList =  Object.keys(result)[0];
    //
    // console.log("FilteredUserList:" +filteredUserList);

    var users = _.filter(parsedResult[product], function(user){
      return user.email==true;
    });

    console.log("[EMAIL]: Users to be sent is: "+users);

    _.each(users, function(userData){
      console.log("[E-mail]: Price is: "+price+"Range is: "+userData.priceRange);
        if(userData.useremail){
          parseInt(price) < parseInt(userData.priceRange)? sendMail(userData.useremail, productUrl): console.log("[E-mail]: Price did not meet criteria. Email not sent!");
          console.log("[E-Mail]: Sending Email out for email: "+ userData.useremail);
        } else
          console.error("No email in Redis. Please check!");
    });
    console.log("[EMAIL]Result from Email: "+parsedResult);
  });

}

exports.sendEmail = function(alert){

  //console.log(alert);

  var message = JSON.parse(alert.toString());
  var product = Object.keys(message)[0];
  var productUrl = message[product].href;
  var price = message[product].price.trim();
  var priceSplit = price.split("$")[1];

  console.log("ProductUrl is: "+productUrl+"product is: "+product+"With PriceSplit:"+priceSplit);

  computeUserEmailNotif(product, productUrl, priceSplit);

}

function sendMail(userEmail, productUrl){

  console.log("Sending email to: "+userEmail+"With Product URL:"+productUrl);

  compiledHTML.compileEmail(productUrl, function(compiledEmail){

    if(compiledEmail){
      // setup e-mail data with unicode symbols
      var mailOptions = {
        from: '"Rapchik Deals! 👥" <noreply@rapchik.online>', // sender address
        to: userEmail, // list of receivers
        subject: '[Rapchik] We have found your DEAL! ✔', // Subject line
        //text: 'Here is the deal You  want !! ' + productUrl, // plaintext body
        html: compiledEmail // html body
      };

// send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
        if(error){
          return console.log(error);
        }
        //console.log('Message sent: ' + info.response);
      });
    }

  });


}

