var Q = require('q');
var request = require('request');

var endpoint = 'https://graph.facebook.com';
var token = 'abcdfiruweferug';


var make_request = function(action) {
    var deferred = Q.defer();

    var options = {
        method: 'GET',
        uri: endpoint + action + '?token=' + token
    };

    var run = function run() {
        request(options)
        .on('response', function(response) {
            var output= '';

            response.on('data', function (chunk) {
                output += chunk;
            });

            response.on('end', function () {
                deferred.resolve(output);
            });
        })
        .on('error', function(err) {
            console.log(err);
            deferred.reject(err);
        });
    };
    return deferred.promise;
}

//var deferredTask = function (i) {
function deferredTask(i) {
    var deferred = Q.defer();

    function run() {
        deferred.resolve(i);
    }
    return deferred.promise;
};

var tasks = [];
for (i = 0; i < 5; i++) {
    tasks.push(deferredTask(i));
}

console.log('jepajee');

console.dir(tasks);

