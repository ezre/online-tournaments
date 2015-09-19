/// <reference path="../typings/tsd.d.ts"/>

var express = require('express');
var app = express();
var router = express.Router()

router.get('/', function(req, res, next) {
  res.send('Hello world!');
  next();
});

router.post('/game/start', function(req, res, next) {
  // @todo start new game here
});

router.post('/move', function (req, res, next) {
  // @todo make a move here
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
});
