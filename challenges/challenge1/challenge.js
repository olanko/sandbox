var Q = require('q');
var request = require('request');

var fs = require('fs');
var logfile = 'request_log.txt';

function log(msg) {
    var l = fs.createWriteStream(logfile, { flags: 'a'});

    return l.write(msg + '\n');
};

//Queuing tasks
var queue = [];

var MAXTASKS = 3;
var TIMEWINDOW = 5 * 1000;

//List of timestamps that tell when tasks were executed.
var tasks_run = [];

var endpoint = 'https://graph.facebook.com';
var token = 'abcdfiruweferug';

function make_request(options) {
    var def = options.def;

    request(options)
    .on('response', function(response) {
        var output= '';

        response.on('data', function (chunk) {
            output += chunk;
        });

        response.on('end', function () {
            var o = JSON.parse(output);
            if (o.error) {
                log(output);
                def.reject(output);
            }
            def.resolve(output);
        });
    })
    .on('error', function(err) {
        log(err);
        def.reject(err);
    });
}

//Runs task or puts it in the queue
function run_or_queue(options) {
    if (!tasks_run.length || tasks_run.length < MAXTASKS) {
        //console.log('task: ' + options + ' tasks_run.length=' + tasks_run.length + ' tasks_run:'+ tasks_run);
        make_request(options);
        //Set first timeslot to be freed after TIMEWINDOW.
        if (!tasks_run.length) {
            setTimeout(free_slot, TIMEWINDOW);
        }
        tasks_run.push(Date.now());
    } else {
        queue.push(options);
    }
}

//Create new deferred task
function task(options) {
    var def = Q.defer();
    options.def = def;

    run_or_queue(options);
    return def.promise;
}

//Frees a timeslot and runs next task
function free_slot() {
    //Free oldest slot.
    tasks_run.shift();

    if (queue.length) {
        //Run first task in queue.
        run_or_queue(queue.shift());
    }
    if (tasks_run.length) {
        //Wait for next slot to get freed.
        setTimeout(free_slot, tasks_run[0] + TIMEWINDOW - Date.now());
    }
}

function get(action) {
    var options = {
        method: 'GET',
        uri: endpoint + action + '?token=' + token
    };
    return task(options);
}

function post(action, params) {
    var options = {
        method: 'POST',
        uri: endpoint + action + '?token=' + token,
        form: params
    };
    return task(options);
}

function put(action, params) {
    var options = {
        method: 'PUT',
        uri: endpoint + action + '?token=' + token,
        form: params
    };
    return task(options);
}
module.exports = {
    get: get,
    post: post,
    put: put,
    token: token,
    endpoint: endpoint
};
