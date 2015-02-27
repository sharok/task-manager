"use strict"

var assign = require('object-assign'),
    baseStore = require('./baseStore'),
    ACTIONS = require('constants/actionTypes'),

    startAdd = false,
    task = {};

var defaultTask = {
    today: true,
    date: null,
    priority: 2
};

task = defaultTask;

var quickTaskAddStore = baseStore({
    startedAdd: function () {
        return startAdd;
    },

    priority: function () {
        return task.priority;
    },

    forToday: function () {
        return task.today;
    },

    setupActions: function (mapAction) {
        mapAction(ACTIONS.START_ADD_TASK, function (payload) {
            startAdd = true;
        });

        mapAction(ACTIONS.STOP_ADD_TASK, function (payload) {
            startAdd = false;
            task = defaultTask;
        });

        mapAction(ACTIONS.SET_ADDITION_TASK_DATE, function (payload) {
            assign(task, {
                today: payload.action.today,
                date: payload.action.date
            });
        });

        mapAction(ACTIONS.SET_ADDITION_TASK_PRIORITY, function (payload) {
            var priority = payload.action.priority;

            console.log(priority);

            priority = priority > 5 ? 5 : priority;
            priority = priority < 0 ? 0 : priority;

            console.log(priority);

            assign(task, {
                priority: priority
            });
        });
    }
});

module.exports = quickTaskAddStore;