"use strict"

var Promise = require('es6-promise').Promise,
    modalStore = require('./store'),
    POPUP_TYPES = require('./popupTypes');

var actions = {
    confirm: function (popup) {
        var resolve, promise = new Promise(function (res) {
            resolve = res;
        });

        modalStore.push({
            type: POPUP_TYPES.CONFIRM,
            promise: promise,
            resolve: resolve,
            popup: popup
        });

        return promise;
    },

    calendar: function (popup) {
        var resolve, promise = new Promise(function (res) {
            resolve = res;
        });

        modalStore.push({
            type: POPUP_TYPES.CALENDAR,
            promise: promise,
            resolve: resolve,
            popup: popup
        });

        return promise;
    }
};

module.exports = actions;