"use strict"

var assign = require('object-assign'),
    utils = require('libs/utils'),
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

var _get = function (filterModel) {
    if (typeof filterModel === 'undefined') {
        return _tasks;
    }

    if (typeof filterModel !== 'object') {
        filterModel = { _id: filterModel };
    }

    return _tasks.filter(function (t) {
        return utils.liteEqual(t, filterModel); 
    });
};

var tasksStore = baseStore({
    __test__: {
        set: function (tasks) {
            _tasks = tasks;
        },
    },

    tasksForToday: function () {
        return tasksStore.get({ today: true });
    },

    tasksForThen: function () {
        return tasksStore.get({ today: false });
    },

    get: function (filterModel) {
        var result,
            single = false;

        if (typeof filterModel !== 'undefined' && typeof filterModel !== 'object') {
            single = true;
        }

        result = _get(filterModel);
        return single ? utils.clone(result[0]) : utils.clone(result);
    },

    count: function () {
        return _tasks.length;  
    },

    setupActions: function (mapAction, invokeAction) {
        mapAction(ACTIONS.SAVED_TASK, function (payload) {
            var savedTask = _trimTask(payload.action.task);
            _tasks.push(savedTask)
        });

        mapAction(ACTIONS.PUT_TASKS_PACK, function (payload) {
            var tasks = payload.action.tasks;
            _tasks = tasks.map(_trimTask);
        });

        mapAction(ACTIONS.TASK_DONE, function (payload) {
            var taskId = payload.action.taskId,
                doneTask = _get(taskId);
                
            doneTask[0].done = true;
        });
    }
});

module.exports = tasksStore;