api = require('throttling-test');

function o(i) {
    api.get('/oakorhonen')
    .then(function(results) {
        console.log(i + ' results:', results);
    })
    .catch(function(err) {
        console.error(i + ' Error received:', err);
    })
};

// api.get('/campaigns').then(function(results) {
//   console.log('results:', results);
// }, function(error) {
//   console.error('Error received:', error);
// });

for (var i = 0; i < 10; i++) {
    console.log(i + ' started');
    setTimeout(o, i * 3000, i);
}

var queue = [];
var nreqs = 0;
var MAXREQUESTS = 3;
var TIMELIMIT = 10 * 1000;

function nextreq() {
    if (!queue.length) {
        return;
    }

    if (queue.length < MAXREQUEST || queue[0].ts + timelimit < Date.now()) {
        var r = shift(queue);
        console.log(r.ts + ' ' + Date.now());

        setTimeout(o, 0, r.i);
        nextreq();
    } else {
        console.log('reqs full:, wait for ' + queue[0].ts + timelimit - Date.now());
        setTimeout(nextreq, queue[0].ts + timelimit - Date.now());
    }
}

function makerequest(i) {
    queue.push({'i': i, 'ts': Date.now()});
    nextreq();
}
