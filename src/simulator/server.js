'use strict';

require('timers');

var server = require('ws').Server;

var Wamp = require('cjs-wamp');

var data = require('./data');

var wampUrl = 'ws://localhost:4099';

var server = new Server({ port: 4099 }),
    Wamp = require('cjs-wamp');



server.on('connection', function (connection) {
    var wamp = new Wamp(connection);

    setInterval(function () {

        console.log('Sending data');

        wamp.call('cncData', data);
    }, 3000);

});

var realm = 'infra.cnc.server.simulator';

console.log('creating Wamp server at ' + wampUrl);

console.log('Realm: ' + realm);
