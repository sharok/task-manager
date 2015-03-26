"use strict"

var appDispatcher = require('appDispatcher'),
    api = require('api'),
    ACTION_TYPES = require('constants/actionTypes');

var appActions = {
    receiveTasks: function () {
        api.tasks.get().then(function (tasks) {
            appDispatcher.handleViewAction({
                type: ACTION_TYPES.TASKS_RECEIVED,
                tasks: tasks
            });
        });
    }
};

module.exports = appActions;