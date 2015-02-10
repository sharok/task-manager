"use strict"

var appActions = require('./actions/appActions'),
    pages = require('./constants/pages'),
    route = require('page');

module.exports = function () {
    route('/', function () {
        appActions.changePage(pages.MAIN);
    });

    route('/tasks', function () {
        appActions.changePage(pages.TASKS);
    });

    route('/profile', function () {
        appActions.changePage(pages.PROFILE);
    });

    route.start();
};

