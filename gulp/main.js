module.exports = function (tasksNames) {
    var tasks = {};

    tasksNames.forEach(function (taskName) {
        tasks[taskName] = require('./tasks/' + taskName);
    });

    return tasks;
};