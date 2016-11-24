/**
 * Created by rdabbir on 11/20/16.
 */

var Horseman = require('node-horseman');
var horseman = new Horseman({timeout: 15000, interval: 150});

exports.sendSMSFree = function(toNumber, link){

  console.log("Sending SMS through 3rd party with "+toNumber+"and"+link);

  return new Promise((res, rej) => {
    setTimeout(() => {
      horseman
        .open('http://www.textport.com/')
        .type('input[id="ctl00_BodyContent1_TextBoxMobileTo"]', toNumber)
        .type('input[id="ctl00_BodyContent1_TextBoxFrom"]', 'noreply@rapchik.online')
        .type('textarea[id="ctl00_BodyContent1_TextBoxMessage"]', link)
        .click('[name="ctl00$BodyContent1$ButtonSubmit"]')
        .then(function(){
          //console.log("SMS Sent");
          horseman.close();
          res();
        });
      // res("fun1");
    }, 15000);
  });
}


