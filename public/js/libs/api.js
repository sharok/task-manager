"use strict"

//TODO: сделать как то нормально)
var ajax = require('component-ajax');

var sendRequest = function (url, callback) {
    ajax.get('/api/' + url, function (res) {
        var result = JSON.parse(res);
        callback(result);
    });
};

var api = {
    account: {
        isAuthorized: function (callback) {
            sendRequest('account/isAuthorized', callback);
        }
    }
};

module.exports = api;