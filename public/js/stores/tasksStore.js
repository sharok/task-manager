"use strict"

var assign = require('object-assign'),
    baseStore = require('./baseStore'),
    ACTIONS = require('constants/actionTypes');

var tasksStore = baseStore({
    setupActions: function (mapAction, invokeAction) {
        mapAction(ACTIONS.SAVED_TASK, function (payload) {

        });
    }
});