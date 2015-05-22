var tasks = {
    queue: [],

    //List of timestamps that tell when tasks were executed.
    tasks_executed: [],

    //Number of tasks executed in window.
    ntasks: 0,

    //MAX tasks per TIMEWINDOW.
    MAXTASKS: 3,
    TIMEWINDOW: 5,

    task: function(i) {
        console.log('task: ' + i + ' ntasks=' + this.ntasks + ' tasks_executed:'+ this.tasks_executed);
        if (this.ntasks < this.MAXTASKS) {
            console.log('task: ' + i + ' ntasks=' + this.ntasks + ' tasks_executed:'+ this.tasks_executed);
            if (!this.tasks_executed.length) {
                setTimeout(this.free_slot, this.TIMEWINDOW);
            }
            this.tasks_run.push(Date.now());
            this.ntasks++;
        } else {
            this.queue.push(i);
        }
    },

    free_slot: function() {
        this.tasks_run.shift();
        this.ntasks--;

        console.log('free_slot: ntasks=' + this.ntasks);
        if (this.queue.length) {
            this.task(this.queue.shift());
        }
        if (this.tasks_run.length) {
            //Wait for next slot to get freed.
            setTimeout(this.free_slot, this.tasks_run[0] + this.TIMEWINDOW - Date.now());
        }
    }
};

console.dir(tasks);

var t = tasks.task;

for(var i = 0; i < 100; i++) {
    setTimeout(t, 10 * i, i);
}

console.log('tasks set');


