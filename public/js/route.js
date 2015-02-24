"use strict"

var route = require('page'),
    authorizer = require('libs/authorizer'),
    appActions = require('actions/appActions'),
    PAGES = require('constants/pages');

var onlyForAuthorized = function (ctx, next) {
    if (authorizer.isAuthorized()) {
        next();
    } else {
        route('/login');
    }
};

var routeMap = function () {
    route('/', onlyForAuthorized, function () {
        appActions.changePage(PAGES.DESK);
    });

    route('/tasks', onlyForAuthorized, function () {
        appActions.changePage(PAGES.TASKS);
    });

    route('/profile', onlyForAuthorized, function () {
        appActions.changePage(PAGES.PROFILE);
    });

    authorizer.init(function () {
        route.start()
    });
};

module.exports = routeMap;

