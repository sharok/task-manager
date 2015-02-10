"use strict"

var React = require('react'),
    baseStore = require('./baseStore'),
    actionTypes = require('../constants/actionTypes'),
    pages = require('../constants/pages'),
    pageStore,

    _pages = { },
    _currentPage = null,
    _currentPageName = null;

_pages[pages.MAIN] = React.createFactory(require('../pages/main.jsx'));
_pages[pages.TASKS] = React.createFactory(require('../pages/tasks.jsx'));
_pages[pages.PROFILE] = React.createFactory(require('../pages/profile.jsx'));

pageStore = baseStore({
    currentPage: function () {
        return _currentPage;
    },

    currentPageName: function () {
        return _currentPageName;
    },

    setupActions: function (mapAction) {
        mapAction(actionTypes.CHANGE_PAGE, function (payload) {
            _currentPageName = payload.action.page;
            _currentPage = _pages[_currentPageName] || null;
        });
    }
});

module.exports = pageStore;