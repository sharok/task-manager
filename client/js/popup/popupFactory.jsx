"use strict"

var React = require('react'),
    POPUP_TYPES = require('./popupTypes'),
    invariant = require('invariant');

var popups = {};
popups[POPUP_TYPES.CONFIRM] = require('./types/confirm.jsx');
popups[POPUP_TYPES.CALENDAR] = require('./types/calendar.jsx');

var popupFactory = {
    create: function (type, resolve, props) {
        var Popup = popups[type];
        invariant(Popup, 'unknown popup `%s`', type);

        return <Popup popup={ props } resolve={ resolve } />;
    }
};

module.exports = popupFactory;