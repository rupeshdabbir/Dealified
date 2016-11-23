/**
 * Created by Nrsimha on 11/8/16.
 */

var Xray = require('x-ray');
var r = require('rethinkdb');
// var imageSearch = require('node-google-image-search');
var imageSearch = require('../src/lib/node-google-image-search')
var db, rdb;
//var rethinkDB = require('rethinkdb')
var mongo = require('./mongo');
var changes = require('./changes');
mongo.connect(function(_db){
  db = _db;
});

// mongo.rethinkconnect(function(_rdb){
//   rdb = _rdb;
// })

var moment = require('moment');
// var client = new ImagesClient('000194609912026653874:3qji0om58ew', 'AIzaSyB2sYHPi8eUaOhjQO048E-aFJrdLB0QCSo');



var xray = Xray({
  filters: {
    trim: function (value) {
      return typeof value === 'string' ? value.trim() : value
    },
    reverse: function (value) {
      return typeof value === 'string' ? value.split('').reverse().join('') : value
    },
    slice: function (value, start , end) {
      return typeof value === 'string' ? value.slice(start, end) : value
    }
  }
}).concurrency(5);

exports.crawl = function() {
  var end;
  console.log("Running Crawler");
  // console.log(db);
  // xray('http://google.com', 'title')(function (err, title) {
  //     // console.log(title);
  // });

  var start = new Date();
  xray('https://www.dealighted.com/main/page-1', '.dealBody ', [{
    title: '.dealTitle > a ',
    href: '.dealTitle > a@href',
    price: '.dealBody .price',
    image:'.siddharth'
  }])(function (err, title) {
    // console.log(title);
      title.forEach(function (element) {

        // console.log(element);

        product = db.collection('products');
        product.findOne({"title":element.title}, function(err, find) {
          
          console.log('in mongo');

          if(find == null) {

            imageSearch(element.title, function (results) {
              console.log('in image');

              if (results.items != undefined) {
                var price = element.price || 'Please check the title';
                console.log('in deals'+ results.items[0].link);
                // console.log(results);
                var image = results.items[0].link;
               
                product.updateOne({"title": element.title},
                  {
                    $set: {
                      "title": element.title,
                      "href": element.href,
                      "image": image,
                      "price": price
                    }
                  }, {upsert: true}, function (err) {
                    if (err)
                      console.log(err);
                  });

                r.connect({host: 'localhost', port: 28015}, function (err, conn) {
                  if (err) throw err;
                  // r.db('delified').tableCreate('products').run(conn, function(err, res) {
                  //   if(err) throw err;
                  //   console.log(res);

                  //console.log(element);
                  if (element.title) {
                    r.db('delified').table('products').insert({
                      "id": element.title ? element.title : "null",
                      "href": element.href,
                      "price": price,
                    }, {
                      returnChanges: true,
                      conflict: "error"
                    }).run(conn, function (err, res) {
                      if (err) console.log(err);
                      // console.log(res);
                    });
                  }

                });
              }
            }, 0, 1);
          }
        });

      })

    });

  xray('https://slickdeals.net', '.fpGridBox', [{
    title: '.itemImageAndName a.itemImageLink@title',
    href: '.itemImageAndName a.itemImageLink@href',
    image: 'div.imageContainer img@src',
    price: '.fpGridBox .itemInfoLine .itemPrice | trim'
  }])(function (err, title) {

    if(err)
      console.error(err);
    if(!title)
      console.error("no results!");
    if(title) {
      title.forEach(function (element) {

        if(element.title) {
          xray(element.href, '#titleInfoRow', {
            date: '.date',
            time: '.time'
          })(function (err, data) {

            if (err)
              console.error(err);

            // console.log(data);

            if (!data)
              console.log("no date");

            if (data) {
              if (data.time == undefined) {
                console.error("Time is Undefined, falling back to undefined time");
                data.time = "undefined";
              }

              if (data.date == undefined) {
                console.error("Date is Undefined, falling back to undefined date");
                data.date = "undefined";
              }

              else if (data.date == 'Today') {
                data.date = moment().format("MM-DD-YYYY");
              }
              else if (data.date == 'Yesterday')
                data.date = moment().subtract(1, 'days').format("MM-DD-YYYY");


              products = db.collection('products');
              // console.log(element.title);
              // console.log("Data.date is:"+data.date);

              element.price = element.title.match(/\$((?:\d|\,)*\.?\d+)/g) || ['Please check the title'];


              // _do something with results_;

              products.findOne({"title":element.title}, function(err, find){
                if(find == null) {
                  imageSearch(element.title, function (results) {

                    if (results.items != undefined) {
                      console.log(results.items[0].link);

                      element.image = results.items[0].link;
                      products.updateOne({"title": element.title},
                        {
                          $set: {
                            "title": element.title,
                            "href": element.href,
                            "image": element.image,
                            "price": element.price[0],
                            "postDate": data.date,
                            "postTime": data.time
                          }
                        },
                        {upsert: true}, function (err) {
                          if (err)
                            console.log(err);
                        });

                      r.connect({host: 'localhost', port: 28015}, function (err, conn) {
                        if (err) throw err;
                        // r.db('delified').tableCreate('products').run(conn, function(err, res) {
                        //   if(err) throw err;
                        //   console.log(res);

                        //console.log(element);
                        if (element.title) {
                          r.db('delified').table('products').insert({
                            "id": element.title ? element.title : "null",
                            "href": element.href,
                            "price": element.price[0],
                            "postDate": data.date,
                            "postTime": data.time
                          }, {
                            returnChanges: true,
                            conflict: "error"
                          }).run(conn, function (err, res) {
                            if (err) console.log(err);
                            // console.log(res);
                          });
                        }

                      });
                    }
                  }, 0, 1);
                }
              });

            }
          });
        }
      });
    }
  });

    xray('https://slickdeals.net/forums/forumdisplay.php?f=9', '[id^=sdpostrow_]', [{
        title: '[id^=td_threadtitle_] .threadtitleline > a | trim',
        href: '[id^=td_threadtitle_] .threadtitleline > a@href | trim',
        postDate: '[id^=td_postdate_] .smallfont | trim'
    }])
        .paginate('.search_pagenav_text@href')
        .limit(10)(function (err, title) {
                title.forEach(function (element) {

                  deal = db.collection('products');
                    deal.findOne({"title":element.title}, function(err, find) {

                      if(find == null) {

                        imageSearch(element.title, function (results) {

                          if (results.items != undefined) {
                            var price = element.title.match(/\$((?:\d|\,)*\.?\d+)/g) || ['Please check the title'];
                             console.log('in deals'+ results.items[0].link);
                            // console.log(results);
                            var image = results.items[0].link;
                            var a = element.postDate.split('\n');
                            element["postTime"] = a[1].trim();
                            if (a[0] == 'Today')
                              element.postDate = moment().format("MM-DD-YYYY");
                            else if (a[0] == 'Yesterday')
                              element.postDate = moment().subtract(1, 'days').format("MM-DD-YYYY");

                            else
                              element.postDate = a[0];

                            product.updateOne({"title": element.title},
                              {
                                $set: {
                                  "title": element.title,
                                  "href": element.href,
                                  "image": image,
                                  "price": price[0],
                                  "postDate": element.postDate,
                                  "postTime": element.postTime
                                }
                              }, {upsert: true}, function (err) {
                                if (err)
                                  console.log(err);
                              });
                            r.connect({host: 'localhost', port: 28015}, function (err, conn) {
                              if (err) throw err;
                              // r.db('delified').tableCreate('products').run(conn, function(err, res) {
                              //   if(err) throw err;
                              //   console.log(res);

                              //console.log(element);
                              if (element.title) {
                                r.db('delified').table('products').insert({
                                  "id": element.title ? element.title : "null",
                                  "href": element.href,
                                  "price": price[0],
                                  "postDate": element.postDate,
                                  "postTime": element.postTime
                                }, {
                                  returnChanges: true,
                                  conflict: "error"
                                }).run(conn, function (err, res) {
                                  if (err) console.log(err);
                                  // console.log(res);
                                });
                              }

                            });
                          }
                        }, 0, 1);
                      }
                    });

                })

    });
}


exports.getData = function(req,res){

  db.collection('products').find({}).toArray(function(err, data){
    res.status(200).json(data);
  });
}


exports.searchData = function(req,res){

  //console.log(req);
  var data = req.body['demo'];
  //console.log(data);

  var regex = { title: { $regex: ''+data+'', $options: 'i' } };
  // //console.log(regex);
  // db.collection('dealighted').find(regex).limit(10).toArray(function(err, delighted){
  //   var data = delighted;
  //  
  // db.collection('deals').find(regex).limit(10).toArray(function(err, hotDeals){
  // data = delighted.concat(hotDeals);
  db.collection('products').find(regex).limit(10).toArray(function(err, slickDeals){
     data = slickDeals;
    res.status(200).json(data);
  });
  // });
  // });
}
