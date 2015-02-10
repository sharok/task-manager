"use strict"

var React = require('react'),
    baseStore = require('./baseStore'),
    actionTypes = require('../constants/actionTypes'),
    pages = require('../constants/pages'),
    pageStore,

    _pages = { },
    _currentPage = null;

_pages[pages.MAIN] = React.createFactory(require('../pages/main.jsx'));

pageStore = baseStore({
    currentPage: function () {
        return _currentPage;
    },

    setupActions: function (mapAction) {
        mapAction(actionTypes.CHANGE_PAGE, function (payload) {
            _currentPage = _pages[payload.action.page] || null;
        });
    }
});

module.exports = pageStore;