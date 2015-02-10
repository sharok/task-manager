"use strict"

var appActions = require('./actions/appActions'),
    pages = require('./constants/pages'),
    route = require('page');

module.exports = function () {
    route('/', function () {
        appActions.changePage(pages.MAIN);
    });

    route.start();
};

