"use strict"

var api = require('./api'),
    Promise = require('es6-promise').Promise,
    isUserAuthorized = false;

var authorizer = {
    init: function () {
        return api.account.isAuthorized().then(function (res) {
            isUserAuthorized = res.result === 1;
            return new Promise(function (resolve) {
                resolve(isUserAuthorized);
            })
        });
    },

    isAuthorized: function () {
        return isUserAuthorized;
    }
};

module.exports = authorizer;