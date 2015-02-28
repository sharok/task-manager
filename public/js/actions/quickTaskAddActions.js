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

    setAdditionTaskTitle: function (title) {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.SET_ADDITION_TASK_TITLE,
            title: title
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
    },

    saveAdditionTask: function () {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.SAVE_ADDITION_TASK
        });
    },

    changeAdditionBlock: function (block) {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.CHANGE_QUICK_ADD_BLOCK,
            block: block
        });
    }
};

module.exports = quickTaskAddActions;