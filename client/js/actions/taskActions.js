"use strict"

var _updateTask,
    appDispatcher = require('appDispatcher'),
    lzSn = require('localization').get('sentences'),
    popup = require('../popup/main'),
    api = require('api'),
    ACTION_TYPES = require('constants/actionTypes');

_updateTask = function (task) {
    appDispatcher.handleViewAction({
        type: ACTION_TYPES.TASK_UPDATED,
        task: task
    });
};

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
        api.tasks.update(id, { done: true }, function (task) {
            _updateTask(task); 
        });
    },
    makeActive: function (id) {
        api.tasks.update(id, { done: false }, function (task) {
           _updateTask(task); 
        });
    },
    postponeTask: function (id) {
        popup.confirm({
            title: lzSn.ASK_SET_DATE,
            detail: lzSn.ASK_SET_DATE_DETAIL,
            yes: lzSn.SET_DATE_CONFIRM,
            defaultValue: false
        }).then(function (setDate) {
            if (!setDate) return;
            return popup.calendar();
        }).then(function (res) {
            res = res || {};
            api.tasks.update(id, { 
                date: res.date || null,
                timeWasSet: res.timeWasSet || false,
            }, function (task) {
                _updateTask(task);
            });          
        });
    },
    forToday: function (id) {
        api.tasks.update(id, { date: new Date(), today: true }, function (task) {
            _updateTask(task);
        });
    }
};

module.exports = taskActions;