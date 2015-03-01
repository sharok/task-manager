"use strict"

var assign = require('object-assign'),
    baseStore = require('./baseStore'),
    ACTIONS = require('constants/actionTypes'),
    QUICK_ADD_BLOCKS = require('constants/quickTaskAddBlocks'),

    startAdd = false,
    activeBlock = QUICK_ADD_BLOCKS.TEXT_BOX;

var defaultTask = {
    title: '',
    today: true,
    date: new Date(),
    priority: 2
};

var task = assign({}, defaultTask);

var quickTaskAddStore = baseStore({
    startedAdd: function () {
        return startAdd;
    },

    getTask: function () {
        return assign({}, task);
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
            if (!startAdd && payload.action.block) return;
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
            invokeAction(ACTIONS.STOP_ADD_TASK);
        });
    }
});

module.exports = quickTaskAddStore;