"use strict"

var api = require('./api'),
    isUserAuthorized = false;

var authorizer = {
    init: function (callback) {
        api.account.isAuthorized(function (res) {
            isUserAuthorized = res.result == 1;
            callback();
        });
    },

    isAuthorized: function () {
        return isUserAuthorized;
    }
};

module.exports = authorizer;