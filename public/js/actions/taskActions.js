"use strict"

var appDispatcher = require('appDispatcher'),
    api = require('api'),
    ACTION_TYPES = require('constants/actionTypes');

var taskActions = {
    receiveTasks: function () {
        api.tasks.get(function (tasks) {
            taskActions.putPack(tasks);
        });
    },
    putPack: function (tasks) {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.PUT_TASKS_PACK,
            tasks: tasks
        });
    },
    markAsDone: function (id) {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.TASK_DONE,
            taskId: id
        });
    }
};

module.exports = taskActions;