"use strict"

var route = require('page'),
    authorizer = require('./libs/authorizer'),
    appActions = require('./actions/appActions'),
    PAGES = require('./constants/pages');

var onlyForAuthorized = function (ctx, next) {
    if (authorizer.isAuthorized()) {
        next();
    } else {
        route('/login');
    }
};

var onlyForNotAuthorized = function (ctx, next) {
    if (!authorizer.isAuthorized()) {
        next();
    }
    else {
        route('/')
    }
}

var routeMap = function () {

    route('/', onlyForNotAuthorized, function () {
        appActions.changePage(PAGES.MAIN);
    });

    route('/login', onlyForNotAuthorized, function () {
        appActions.changePage(PAGES.LOGIN);
    });

    route('/signup', onlyForNotAuthorized, function () {
        appActions.changePage(PAGES.SIGNUP);
    });

    route('/welcome', onlyForNotAuthorized, function () {
        appActions.changePage(PAGES.WELCOME);
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

