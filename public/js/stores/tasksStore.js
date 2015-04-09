"use strict"

var assign = require('object-assign'),
    dater = require('libs/dater'),
    baseStore = require('./baseStore'),
    ACTIONS = require('constants/actionTypes'),
    _tasks = [];

var taskMethods = {
    precedence: function (unit) {
        if (unit === '%') {
            return this.priority * 100 / 5;
        } else {
            throw new Error("unknown unit of precedence: `" + unit + "`");
        }
    }
};

var _trimTask = function (task) {
    task = assign({}, task, taskMethods, {
        today: dater.equalDays(new Date(), task.date),
        done: false
    });

    return task;
};

var tasksStore = baseStore({
    tasksForToday: function () {
        return _tasks.filter(function (task) {
            return task.today;
        });
    },

    tasksForThen: function () {
        return _tasks.filter(function (task) {
            return !task.today;
        });
    },

    setupActions: function (mapAction, invokeAction) {
        mapAction(ACTIONS.SAVED_TASK, function (payload) {
            var savedTask = _trimTask(payload.action.task);
            _tasks.push(savedTask)
        });

        mapAction(ACTIONS.TASKS_RECEIVED, function (payload) {
            var tasks = payload.action.tasks;
            _tasks = tasks.map(_trimTask);
        });
    }
});

module.exports = tasksStore;