/**
 * Created by Nrsimha on 11/8/16.
 */

var Xray = require('x-ray');
var mongo = require('./mongo');
var db;
mongo.connect(function(_db){
    db = _db;
});
var moment = require('moment');


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
    console.log("Running");
    // console.log(db);
    // xray('http://google.com', 'title')(function (err, title) {
    //     // console.log(title);
    // });

    var start = new Date();

    xray('https://slickdeals.net', '.fpGridBox', [{
        title: '.itemImageAndName a.itemImageLink@title',
        href: '.itemImageAndName a.itemImageLink@href',
        image: 'div.imageContainer img@src',
        price: '.fpGridBox .itemInfoLine .itemPrice | trim'
    }])(function (err, title) {
            title.forEach(function (element) {

                xray(element.href, '#titleInfoRow', {
                    date: '.date',
                    time: '.time'
                })(function(err, data){
                    if(data.date == 'Today')
                        data.date = moment().format("MM-DD-YYYY");
                    else if(data.date == 'Yesterday')
                        data.date = moment().subtract(1, 'days').format("MM-DD-YYYY");

                    products = db.collection('products');

                    // console.log(element.title);
                    products.updateOne({"title": element.title},
                        {$set: {"title": element.title, "href": element.href, "postDate": data.date, "postTime": data.time}},
                        {upsert: true}, function (err) {
                            console.log("in");
                            if (err)
                                console.log(err);
                        });

                });


        });

    });

    xray('https://slickdeals.net/forums/forumdisplay.php?f=9', '[id^=sdpostrow_]', [{
        title: '[id^=td_threadtitle_] .threadtitleline > a | trim',
        href: '[id^=td_threadtitle_] .threadtitleline > a@href | trim',
        postDate: '[id^=td_postdate_] .smallfont | trim'
    }])
        .paginate('.search_pagenav_text@href')
        .limit(20)(function (err, title) {
                title.forEach(function (element) {


                    var a = element.postDate.split('\n');
                    element["postTime"] = a[1].trim();
                    if(a[0] == 'Today')
                       element.postDate = moment().format("MM-DD-YYYY");
                    else if(a[0] == 'Yesterday')
                        element.postDate = moment().subtract(1, 'days').format("MM-DD-YYYY");

                    else
                        element.postDate = a[0];

                    product = db.collection('deals');
                    product.updateOne({"title": element.title},
    {$set: {"title": element.title, "href": element.href, "postDate": element.postDate, "postTime": element.postTime}}, {upsert: true}, function (err) {
                        if (err)
                            console.log(err);
                    });

                })

            });



}


//
exports.getData = function(req,res){


    db.collection('deals').find({}).toArray(function(err, data){

        // console.log(data);
        res.status(200).json(data);

    });



    // mongo.connect(mongoURL,function(db){
    //
    //     db.collection('deals').find();
    //
    //
    //
    // });

}