"use strict"

var React = require('react'),
    BaseStore = require('./baseStore'),

    ACTION_TYPES = require('../constants/actionTypes'),
    PAGES = require('../constants/pages'),


    pages = null,
    currentPage = null;

var fillPages = function () {
    var DeskLayout = require('../components/desk-layout.jsx'),
        WelcomeLayout = require('../components/welcome-layout/welcome-layout.jsx');

    pages = {};

    pages[PAGES.LOGIN] = {
        layout: WelcomeLayout,
        page: require('../pages/login.jsx'),
        name: PAGES.LOGIN,
        title: 'Login to Clevy'
    }

    pages[PAGES.MAIN] = {
        layout: DeskLayout,
        page: require('../pages/main.jsx'),
        name: PAGES.MAIN,
        title: 'сегодня'
    };

    pages[PAGES.TASKS] = {
        layout: DeskLayout,
        page: require('../pages/tasks.jsx'),
        name: PAGES.TASKS,
        title: 'все задачи'
    };

    pages[PAGES.PROFILE] = {
        layout: DeskLayout,
        page: require('../pages/profile.jsx'),
        name: PAGES.PROFILE,
        title: 'профиль'
    };
};

var pageStore = BaseStore({
    currentPage: function () {
        if (currentPage == null) return null;

        return currentPage.page;
    },

    currentPageName: function () {
        if (currentPage == null) return null;

        return currentPage.name;
    },

    currentPageLayout: function () {
        if (currentPage == null) return null;
        return currentPage.layout;
    },

    currentPageTitle: function () {
        if (currentPage == null) return null;

        return currentPage.title;
    },

    setupActions: function (mapAction) {
        mapAction(ACTION_TYPES.CHANGE_PAGE, function (payload) {
            if (pages == null) fillPages();
            currentPage = pages[payload.action.page] || null;
        });
    }
});

module.exports = pageStore;