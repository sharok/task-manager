"use strict"

var keys = require('keys');

var actionTypes = keys({
    CHANGE_PAGE: null,
    START_ADD_TASK: null,
    STOP_ADD_TASK: null,
    SET_ADDITION_TASK_PRIORITY: null,
    SET_ADDITION_TASK_DATE: null,
    SET_ADDITION_TASK_TITLE: null,
    CHANGE_QUICK_ADD_BLOCK: null,
    SAVING_ADDITION_TASK: null,
    SAVED_TASK: null,
    PUT_TASKS_PACK: null,
    TASK_UPDATED: null
});

module.exports = actionTypes;
