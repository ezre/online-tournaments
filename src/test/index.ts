/// <reference path="../../typings/requirejs/require.d.ts"/>
/// <reference path="../../typings/mocha/mocha.d.ts"/>
/// <reference path="../../typings/chai/chai.d.ts"/>

import chai   = require('chai');
import mocha  = require('mocha');
import io     = require('socket.io-client');

var should    = chai.should();
var socketUrl = 'http://0.0.0.0:3000'
var options   = {
  transports: ['websocket'],
  'force new connection': true
}

describe('Chess server', function() {
  
});
