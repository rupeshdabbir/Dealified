/**
 * Created by Nrsimha on 11/8/16.
 */

var Xray = require('x-ray');
var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/delified";
var moment = require('moment');
var request = require('request');
var cheerio = require('cheerio');


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
});

exports.crawl = function() {

    console.log("Run");
    xray('http://google.com', 'title')(function (err, title) {
        // console.log(title);
    });


    xray('https://slickdeals.net', '.fpGridBox', [{
        title: '.itemImageAndName a.itemImageLink@title',
        href: '.itemImageAndName a.itemImageLink@href',
        image: 'div.imageContainer img@src',
        price: '.fpGridBox .itemInfoLine .itemPrice | trim'
    }]).limit(20)(function (err, title) {
        title.forEach(function (element) {
            // console.log(element.href);
            request(element.href, function (error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    // var title;
                    console.log($('.date', '#dateTime').text());
                }
            });
        });
    });

    // xray('https://slickdeals.net/forums/forumdisplay.php?f=9', '[id^=sdpostrow_]', [{
    //     title: '[id^=td_threadtitle_] .threadtitleline > a | trim',
    //     href: '[id^=td_threadtitle_] .threadtitleline > a@href | trim',
    //     postDate: '[id^=td_postdate_] .smallfont | trim'
    // }])
    //     .paginate('.search_pagenav_text@href')
    //     .limit(20)(function (err, title) {
    //         mongo.connect(mongoURL, function (db) {
    //             title.forEach(function (element) {
    //                 var a = element.postDate.split('\n');
    //                 element["postTime"] = a[1].trim();
    //                 if(a[0] == 'Today')
    //                    element.postDate = moment().format("MM-DD-YYYY");
    //                 else if(a[0] == 'Yesterday')
    //                     element.postDate = moment().subtract(1, 'days').format("MM-DD-YYYY");
    //
    //                 else
    //                     element.postDate = a[0];
    //
    //                 product = db.collection('deals');
    //                 product.updateOne({"title": element.title, "postDate": element.postDate}, {$set: {"product": element}}, {upsert: true}, function (err) {
    //                     if (err)
    //                         console.log(err);
    //                 });
    //
    //             })
    //
    //         });
    //     });
    // res.render('index', {title: 'Express'});
}

exports.data = function(req,res){


    mongo.connect(mongoURL,function(db){

        db.collection('deals').find();



    });

}