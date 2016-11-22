/**
 * Created by Nrsimha on 11/22/16.
 */

var https = require('https');
require('dotenv').config();

function getImageSearchResults(searchTerm, callback, start, num) {
  start = start < 0 || start > 90 || typeof(start) === 'undefined' ? 0 : start;
  num = num < 1 || num > 10 || typeof(num) === 'undefined' ? 10 : num;

  if (!searchTerm) {
    console.error('No search term');
  }

  var parameters = '&q=' + encodeURIComponent(searchTerm);
  parameters += '&searchType=image';
  parameters += start ? '&start=' + start : '';
  parameters += '&num=' + num;

  var options = {
    host: 'www.googleapis.com',
    path: '/customsearch/v1?key=' + process.env.CSE_API_KEY + '&cx=' + process.env.CSE_ID + parameters
  };

  var result = '';

  https.get(options, function(response) {
    response.setEncoding('utf8');

    response.on('data', function(data) {
      result += data;
    });

    response.on('end', function () {
      var data = JSON.parse(result);
      var result = '';
      // check for usage limits (contributed by @ryanmete)
      // This handles the exception thrown when a user's Google CSE quota has been exceeded for the day.
      // Google CSE returns a JSON object with a field called "error" if quota is exceed.
      if(data.error && data.error.errors) {
        resultsArray.push(data.error.errors[0]);
        // returns the JSON formatted error message in the callback
        callback(result);
      } else {
        // search returned results
        result = data.items[0];
        //   .forEach(function (item) {
        //   // resultsArray.push(item);
        // });
        callback(result);
      }
    });
  });
}

module.exports = getImageSearchResults;
