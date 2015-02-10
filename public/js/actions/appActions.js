"use strict"

var appDispatcher = require('../appDispatcher'),
    actionTypes = require('../constants/actionTypes');

module.exports = {
    changePage: function (page) {
        appDispatcher.handleViewAction({
            type: actionTypes.CHANGE_PAGE,
            page: page
        });
    }
};