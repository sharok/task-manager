"use strict"

var route = require('page'),
    appActions = require('./actions/appActions'),
    PAGES = require('./constants/pages');

var routeMap = function () {
    route('/', function () {
        appActions.changePage(PAGES.MAIN);
    });

    route('/tasks', function () {
        appActions.changePage(PAGES.TASKS);
    });

    route('/profile', function () {
        appActions.changePage(PAGES.PROFILE);
    });

    route.start();
};

module.exports = routeMap;

