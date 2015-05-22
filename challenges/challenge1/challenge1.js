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

var queue = [];
var slotsused = [];
var nreqs = 0;
var minreqts = 0;
var MAXREQUESTS = 3;
var TIMELIMIT = 5 * 1000;
var venataan = false;

function processreq() {
    var nextrun = 0;
    if (!queue.length) {
        return;
    }

    console.log('processreq(): nreqs=' + nreqs + ' queue.length=' + queue.length);

    if (nreqs < MAXREQUESTS) {
        var r = queue.shift();
        slotsused.push(r.ts);
        nreqs++;
        o(r.i);
    }

    //console.log('slotsused[0]=' + slotsused[0]);

    //viimeisin aikaraamin sisällä oleva req
    if (slotsused[0] + TIMELIMIT < Date.now()) {
        console.log('viimeisin ikkunassa oleva kutsu aikaraamin ulkopuolella');
        slotsused.shift();
        nreqs--;
        venataan = false;
        setTimeout(processreq, slotsused[0] + TIMELIMIT - Date.now());
        processreq();
    }

    if (!venataan) {
        //Odotellaan ekaa vapautuvaa slottia
        console.log('setTimeout:' + (slotsused[0] + TIMELIMIT - Date.now()));
        setTimeout(processreq, slotsused[0] + TIMELIMIT - Date.now());
        venataan = true;
    }
}

function makerequest(i) {
    console.log('makerequest(' + i + ')');
    queue.push({'i': i, 'ts': Date.now()});
    processreq();
}

for (var i = 0; i < 10; i++) {
    setTimeout(makerequest, 500 * i, i);;
}
