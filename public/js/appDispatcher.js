"use strict"

var Dispatcher = require('dispatcher'),
    assign = require('object-assign'),
    payloadSources = require('./constants/payloadSources'),

    appDispatcher;

appDispatcher = assign(new Dispatcher(), {
    handleViewAction: function (action) {
        var payload = {
            source: payloadSources.VIEW_ACTION,
            action: action
        };

        this.dispatch(payload);
    },
    
    handleServerAction: function (action) {
        var payload = {
            source: payloadSources.SERVER_ACTION,
            action: action
        };

        this.dispatch(payload);
    }
});

module.exports = appDispatcher;

