/**
 * Created by Nrsimha on 11/8/16.
 */

var Xray = require('x-ray');
var mongo = require('./mongo');
var mongoURL = "mongodb://localhost:27017/delified";


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
    }])(function (err, title) {
        mongo.connect(mongoURL, function (db) {
            // console.log(title);
            title.forEach(function (element) {
                // console.log(element);
                product = db.collection('products');
                product.updateOne({"title": element.title, "price": element.price}, {$set: {"product": element}}, {upsert: true}, function (err) {
                    if (err)
                        console.log(err);
                });

            })

        });
    });

    xray('https://slickdeals.net/forums/forumdisplay.php?f=9', '[id^=sdpostrow_]', [{
        title: '[id^=td_threadtitle_] .threadtitleline > a | trim',
        href: '[id^=td_threadtitle_] .threadtitleline > a@href | trim',
        postDate: '[id^=td_postdate_] .smallfont | trim'
    }])
        .paginate('.search_pagenav_text@href')
        .limit(20)(function (err, title) {
            // title.push({
            //     "title" : "Siddharth",
            //     "href" : "https://slickdeals.net/f/9287447-fisher-price-little-people-sit-n-stand-skyway-23-99-amazon-prime-members",
            //     "image" : "https://static.slickdealscdn.com/attachment/1/0/6/6/9/4/200x200/4746579.thumb",
            //     "price" : "$24\n                                                      $40"
            // });
            mongo.connect(mongoURL, function (db) {
                // console.log(title);
                title.forEach(function (element) {
                    // console.log(element);
                    product = db.collection('deals');
                    product.updateOne({"title": element.title}, {$set: {"product": element}}, {upsert: true}, function (err) {
                        if (err)
                            console.log(err);
                    });

                })

            });
        });
    // res.render('index', {title: 'Express'});
}