var Q = require('q');
var request = require('request');
var http = require('http');

var endpoint = 'https://graph.facebook.com';
var token = 'abcdfiruweferug';

var make_request = function(action) {
    var options = {
        method: 'GET',
        uri: endpoint + action + '?token=' + token
    };

    request.get(options)
    .on('response', function(response) {
        var output= '';

        response.on('data', function (chunk) {
            output += chunk;
        });

        response.on('end', function () {
            console.log(output);
            var obj = JSON.parse(output);
        });
    })
    .on('error', function(error) {
        console.log(error);
    });
};

make_request('/oakorhonen');
