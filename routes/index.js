var express = require('express');
var router = express.Router();
var Xray = require('x-ray');
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
    xray('http://google.com', 'title')(function(err, title) {
        console.log(title) // Google
    });


    // xray('https://dribbble.com', 'li.group', [{
    //     title: '.dribbble-img strong',
    //     image: '.dribbble-img [data-src]@data-src',
    // }])
    //     .paginate('.next_page@href')
    //     .limit(3)
    //     .write('results.json')
    // xray('https://slickdeals.net', 'a.itemImageLink', [{
    //     title: '@title',
    //     href: '@href',
    //     image: 'div.imageContainer img@src'
    // }]).write('results1.json');

    xray('https://slickdeals.net', '.fpGridBox', [{
        title: '.itemImageAndName a.itemImageLink@title',
        href: '.itemImageAndName a.itemImageLink@href',
        image: 'div.imageContainer img@src',
        price: '.fpGridBox .itemInfoLine .itemPrice | trim'
    }]).write('results1.json');

    xray('https://slickdeals.net/forums/forumdisplay.php?f=9', '[id^=sdpostrow_]', [{
        title: '[id^=td_threadtitle_] .threadtitleline > a | trim',
        href: '[id^=td_threadtitle_] .threadtitleline > a@href | trim',
        postDate: '[id^=td_postdate_] .smallfont | trim'
    }])
        .paginate('.search_pagenav_text@href')
        .limit(20)
        .write('results2.json');
});

module.exports = router;
