"use strict"

var React = require('react'),
    BaseStore = require('./baseStore'),

    ACTION_TYPES = require('../constants/actionTypes'),
    PAGES = require('../constants/pages'),

    pages = null,
    currentPage = null;

var fillPages = function () {
    pages = {};

    pages[PAGES.MAIN] = {
        page: React.createFactory(require('../pages/main.jsx')),
        name: PAGES.MAIN,
        title: 'сегодня'
    };

    pages[PAGES.TASKS] = {
        page: React.createFactory(require('../pages/tasks.jsx')),
        name: PAGES.TASKS,
        title: 'все задачи'
    };

    pages[PAGES.PROFILE] = {
        page: React.createFactory(require('../pages/profile.jsx')),
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