"use strict"

var React = require('react'),
    MODAL_TYPES = require('constants/modalTypes'),
    invariant = require('invariant');

var popups = {};
popups[MODAL_TYPES.CONFIRM] = require('./popups/confirm.jsx');

var windowFactory = {
    create: function (type, resolve, props) {
        var Popup = popups[type];
        invariant(Popup, 'unknown popup `%s`', type);

        return <Popup popup={ props } resolve={ resolve } />;
    }
};

module.exports = windowFactory;