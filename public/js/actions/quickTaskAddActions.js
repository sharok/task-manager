"use strict"

var appDispatcher = require('appDispatcher'),
    ACTION_TYPES = require('constants/actionTypes');

var quickTaskAddActions = {
    startAddTask: function () {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.START_ADD_TASK
        });
    },

    stopAddTask: function () {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.STOP_ADD_TASK
        });
    },

    setAdditionTaskForToday: function () {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.SET_ADDITION_TASK_DATE,
            today: true,
            date: new Date()
        });
    },

    setAdditionTaskForDate: function (date) {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.SET_ADDITION_TASK_DATE,
            today: false,
            date: date || null
        });
    },

    setAdditionTaskPriority: function (priority) {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.SET_ADDITION_TASK_PRIORITY,
            priority: priority
        });
    }
};

module.exports = quickTaskAddActions;