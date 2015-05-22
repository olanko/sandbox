//Queuing tasks
var queue = [];

var MAXTASKS = 3;
var TIMEWINDOW = 5 * 1000;

//List of timestamps that tell when tasks were executed.
var tasks_run = [];

function task(i) {
    if (!tasks_run.length || tasks_run.length < MAXTASKS) {
        console.log('task: ' + i + ' tasks_run.length=' + tasks_run.length + ' tasks_run:'+ tasks_run);

        //Set first timeslot to be freed after TIMEWINDOW.
        if (!tasks_run.length) {
            setTimeout(free_slot, TIMEWINDOW);
        }
        tasks_run.push(Date.now());
    } else {
        queue.push(i);
    }
}

function free_slot() {
    //Free oldest slot.
    tasks_run.shift();

    console.log('free_slot: tasks_run.length=' + tasks_run.length);
    if (queue.length) {
        //Run first task in queue.
        task(queue.shift());
    }
    if (tasks_run.length) {
        //Wait for next slot to get freed.
        setTimeout(free_slot, tasks_run[0] + TIMEWINDOW - Date.now());
    }
}

for(var i = 0; i < 10; i++) {
    setTimeout(task, 0 * i, i);
}

console.log('tasks set');
