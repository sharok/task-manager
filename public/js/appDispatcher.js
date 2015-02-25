"use strict"

var Dispatcher = require('dispatcher'),
    assign = require('object-assign'),
    PAYLOAD_SOURCES = require('constants/payloadSources');

var appDispatcher = assign(new Dispatcher(), {
    handleViewAction: function (action) {
        var payload = {
            source: PAYLOAD_SOURCES.VIEW_ACTION,
            action: action
        };

        this.dispatch(payload);
    },
    
    handleServerAction: function (action) {
        var payload = {
            source: PAYLOAD_SOURCES.SERVER_ACTION,
            action: action
        };

        this.dispatch(payload);
    }
});

module.exports = appDispatcher;

