/* eslint-disable strict */
'use strict';

const _ = require('lodash');
var schedule = require('node-schedule');
var bodyParser = require('body-parser')
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
var index = require('./routes/index');
var users = require('./routes/users');
var crawler = require('./routes/crawler');
var changes = require('./routes/changes');
const app = express();
const compiler = webpack(config);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
});

// create application/json parser
var jsonParser = bodyParser.json();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


changes.watch('vizio', 'delified','products');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//Scheduler for running a job!
 //var j = schedule.scheduleJob('*/1 * * *', function() {
  crawler.crawl();
 //});

app.use(devMiddleware);
app.use(require('webpack-hot-middleware')(compiler));

app.use('/api', index);
app.use('/users', users);
app.use( function(req, res, next) {
  const reqPath = req.url;
  // find the file that the browser is looking for
  const file = _.last(reqPath.split('/'));
  console.log(file);
  if (['index.html'].indexOf(file) !== -1) {
    res.end(devMiddleware.fileSystem.readFileSync(path.join(config.output.path, file)));
  } else if (file.indexOf('.') === -1) {
    // if the url does not have an extension, assume they've navigated to something like /home and want index.html
    res.end(devMiddleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html')));
  } else {
    next();
  }
});





/* eslint-disable no-console */
app.listen(process.env.WEBPACK_PORT,  function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:' + process.env.WEBPACK_PORT);
});
/* eslint-enable no-console */
