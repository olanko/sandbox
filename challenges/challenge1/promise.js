var Q = require('q');
var request = require('request');

var endpoint = 'https://graph.facebook.com';
var token = 'abcdfiruweferug';

//var deferredTask = function (i) {
function deferredTask(i) {
    var deferred = Q.defer();

    function run() {
        deferred.resolve(i);
    }

    setTimeout(run, 1000 * i);
    return deferred.promise;
};

for (i = 0; i < 10; i++) {
    deferredTask(i)
    .then(function(result) {
        console.log('r' + result);
    })
    .fail(function(err) {
        console.error(err);
    });
}

console.log('jepajee');