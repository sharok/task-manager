"use strict"

var api = require('./api'),
    isUserAuthorized = false;

var authorizer = {
    init: function (callback) {
        return api.account.isAuthorized(function (res) {
            isUserAuthorized = res.result;
            callback(res.result);
        });
    },

    isAuthorized: function () {
        return isUserAuthorized;
    }
};

module.exports = authorizer;