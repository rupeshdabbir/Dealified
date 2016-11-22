/**
 * Created by Nrsimha on 11/18/16.
 */
var nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
});

// 'smtps://'+process.env.GMAIL_USER+':'+process.env.GMAIL_PASSWORD+'@smtp.gmail.com'

exports.sendEmail = function(alert){

  //console.log(alert);
  //console.log("In send email"+alert.toString());

  var message = JSON.parse(alert.toString());

// setup e-mail data with unicode symbols
var mailOptions = {
  from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address
  to: 'ashikpanchangam@gmail.com', // list of receivers
  subject: '[Rapchik] We have found your DEAL! ✔', // Subject line
  text: 'Here is the deal You  want !! ' + message, // plaintext body
  html: '<b>'+alert.id+'</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
  if(error){
    return console.log(error);
  }
  console.log('Message sent: ' + info.response);
});
}


