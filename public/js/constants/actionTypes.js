"use strict"

var keys = require('keys'),

    actionTypes = keys({
        CHANGE_PAGE: null,
        ADDING_TASK: null,
        LEAVE_ADDING_TASK: null
    });

module.exports = actionTypes;
