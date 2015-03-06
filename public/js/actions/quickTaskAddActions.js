"use strict"

var appDispatcher = require('appDispatcher'),
    api = require('api'),
    popup = require('../popup/main'),
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
        popup.confirm({
            title: 'set the date for the task?',
            detail: 'choose "no" if you want to leave the task later',
            defaultValue: false,
            yes: 'set the date'
        }).then(function (setDate) {
            if (!setDate) return;
            return popup.calendar();
        }).then(function (selectDate) {
            console.log('task date ' + selectDate);
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