"use strict"

var React = require('react'),
    BaseStore = require('./baseStore'),
    lz = require('localization').get(),

    ACTION_TYPES = require('constants/actionTypes'),
    PAGES = require('constants/pages'),


    pages = null,
    currentPage = null;

var fillPages = function () {
    var DeskLayout = require('components/desk-layout.jsx');

    pages = {};

    pages[PAGES.DESK] = {
        layout: DeskLayout,
        page: require('pages/desk.jsx'),
        name: PAGES.DESK,
        title: lz.DESK
    };

    pages[PAGES.TASKS] = {
        layout: DeskLayout,
        page: require('pages/tasks.jsx'),
        name: PAGES.TASKS,
        title: lz.ALL_TASKS
    };

    pages[PAGES.PROFILE] = {
        layout: DeskLayout,
        page: require('pages/profile.jsx'),
        name: PAGES.PROFILE,
        title: lz.PROFILE
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