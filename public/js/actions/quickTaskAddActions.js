"use strict"

var appDispatcher = require('appDispatcher'),
    ACTION_TYPES = require('constants/actionTypes');

var quickTaskAddActions = {
    addingTask: function () {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.ADDING_TASK
        });
    },

    leaveAddingTask: function () {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.LEAVE_ADDING_TASK
        });
    }
};

module.exports = quickTaskAddActions;