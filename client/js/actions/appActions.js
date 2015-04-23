"use strict"

var appDispatcher = require('appDispatcher'),
    ACTION_TYPES = require('constants/actionTypes');

var appActions = {
    changePage: function (page) {
        appDispatcher.handleViewAction({
            type: ACTION_TYPES.CHANGE_PAGE,
            page: page
        });
    }
};

module.exports = appActions;