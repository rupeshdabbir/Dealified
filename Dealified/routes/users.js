var express = require('express');
var router = express.Router();
var mongo = require('./mongo');
mongo.connect(function(_db){
  db = _db;
});
/* GET users listing. */
router.post('/searchData', function(req, res, next) {

  // product = db.collection('users');
  // product.updateOne({"user": element.user},
  //   {$set: {"deals": element.title, "href": element.href, "postDate": element.postDate, "postTime": element.postTime}}, {upsert: true}, function (err) {
  //     if (err)
  //       console.log(err);
  //   });

  console.log(req.body);

  res.status(200);
});

module.exports = router;
