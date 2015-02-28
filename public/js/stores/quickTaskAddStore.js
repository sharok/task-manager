"use strict"

var assign = require('object-assign'),
    baseStore = require('./baseStore'),
    quickTaskAddActions = require('actions/quickTaskAddActions'),
    ACTIONS = require('constants/actionTypes'),
    QUICK_ADD_BLOCKS = require('constants/quickTaskAddBlocks'),

    startAdd = false,
    activeBlock = QUICK_ADD_BLOCKS.TEXT_BOX;

var defaultTask = {
    title: '',
    today: true,
    date: null,
    priority: 2
};

var task = assign({}, defaultTask);

var quickTaskAddStore = baseStore({
    startedAdd: function () {
        return startAdd;
    },

    activeBlock: function () {
        return activeBlock;
    },

    priority: function () {
        return task.priority;
    },

    title: function () {
        return task.title;
    },

    forToday: function () {
        return task.today;
    },

    setupActions: function (mapAction, invokeAction) {
        mapAction(ACTIONS.START_ADD_TASK, function (payload) {
            startAdd = true;
        });

        mapAction(ACTIONS.STOP_ADD_TASK, function (payload) {
            startAdd = false;
            activeBlock = QUICK_ADD_BLOCKS.TEXT_BOX;
            assign(task, defaultTask);
        });

        mapAction(ACTIONS.SET_ADDITION_TASK_DATE, function (payload) {
            assign(task, {
                today: payload.action.today,
                date: payload.action.date
            });
        });

        mapAction(ACTIONS.SET_ADDITION_TASK_TITLE, function (payload) {
            assign(task, {
                title: payload.action.title
            });
        });

        mapAction(ACTIONS.CHANGE_QUICK_ADD_BLOCK, function (payload) {
            activeBlock = payload.action.block;
        });

        mapAction(ACTIONS.SET_ADDITION_TASK_PRIORITY, function (payload) {
            var priority = payload.action.priority;
            priority = priority > 5 ? 5 : priority;
            priority = priority < 0 ? 0 : priority;

            assign(task, {
                priority: priority
            });
        });

        mapAction(ACTIONS.SAVE_ADDITION_TASK, function (payload) {
            var savingTask = assign({}, task);
            invokeAction(ACTIONS.STOP_ADD_TASK);
            console.log('saved ' + savingTask.title);
        });
    }
});

module.exports = quickTaskAddStore;