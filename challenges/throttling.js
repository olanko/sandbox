var req = require('request');
var Q = require('Q');

var fs = require('fs');
var logfile = 'request_log.txt';

var log = function (msg) {
    var l = fs.createWriteStream(logfile, { flags: 'a'});

    return l.write(msg + '\n');
};

