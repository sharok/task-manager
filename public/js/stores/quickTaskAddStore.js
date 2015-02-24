"use strict"

var baseStore = require('./baseStore'),
    ACTIONS = require('constants/actionTypes'),

    addingTask = false;

var quickTaskAddStore = baseStore({
    isAdding: function () {
        return addingTask;
    },

    setupActions: function (mapAction) {
        mapAction(ACTIONS.ADDING_TASK, function (payload) {
            addingTask = true;
        });

        mapAction(ACTIONS.LEAVE_ADDING_TASK, function (payload) {
            addingTask = false;
        });
    }
});

module.exports = quickTaskAddStore;