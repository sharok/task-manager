"use strict"

var Promise = require('es6-promise').Promise,
    modalStore = require('modal/modalStore'),
    MODAL_TYPES = require('constants/modalTypes');

var modalActions = {
    confirm: function (popup) {
        var resolve, promise = new Promise(function (res) {
            resolve = res;
        });

        modalStore.push({
            type: MODAL_TYPES.CONFIRM,
            promise: promise,
            resolve: resolve,
            popup: popup
        });

        return promise;
    }
};

module.exports = modalActions;