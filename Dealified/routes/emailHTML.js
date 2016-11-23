/**
 * Created by rdabbir on 11/22/16.
 */
var fs = require('fs');
var cheerio = require('cheerio');

//specify HTML template to load
var template = '/opt/email.html';
var compiledEmail;
//Output of the changed file.
//var outPath = './../src/lib/compiledEmail.html';

exports.compileEmail = function(href, cb) {
  // get template from file system
  fs.readFile(template, 'utf8', function (err, file) {
    if (err) {
      //handle errors
      console.log("Error while Reading email.html"+err);
    }
    else {
      //compile jade template into function
      var html = file;
      var $ = cheerio.load(file); // load in the HTML into cheerio

      $('#view-deal-inject').attr('href', href);

      compiledEmail = $.html();

      cb(compiledEmail);
    }
  });

}
