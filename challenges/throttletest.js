//Queuing tasks
var queue = [];

var MAXTASKS = 3;
var TIMEWINDOW = 5 * 1000;

//List of timestamps that tell when tasks were executed.
var tasks_run = [];

//Number of tasks executed in window.
var ntasks = 0;

function task(i) {
    if (ntasks < MAXTASKS) {
        console.log('task: ' + i + ' ntasks=' + ntasks + ' tasks_run:'+ tasks_run);
        if (!tasks_run.length) {
            setTimeout(free_slot, TIMEWINDOW);
        }
        tasks_run.push(Date.now());
        ntasks++;
    } else {
        queue.push(i);
    }
}

function free_slot() {
    tasks_run.shift();
    ntasks--;

    console.log('free_slot: ntasks=' + ntasks);
    if (queue.length) {
        task(queue.shift());
    }
    if (tasks_run.length) {
        //Wait for next slot to get freed.
        setTimeout(free_slot, tasks_run[0] + TIMEWINDOW - Date.now());
    }
}

for(var i = 0; i < 100; i++) {
    setTimeout(task, 10 * i, i);
}

console.log('tasks set');
