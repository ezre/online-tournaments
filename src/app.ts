/// <reference path="../typings/tsd.d.ts"/>

var express = require('express');
var app     = express();
var router  = express.Router()
var http    = require('http').Server(app);
var io      = require('socket.io')(http); 

router.get('/', function(req, res, next) {
  res.send('Hello world!');
  next();
});

io.on('connection', function(socket) {
  console.log('New user connected');
  
  socket.on('game start', function(msg) {
    console.log('Received game start message');
  });
  
  socket.on('game piece move', function(msg) {
    console.log('Piece move request');
  });
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  
  console.log('Example app listening at http://%s:%s', host, port);
});
