"use strict"

//TODO: сделать как то нормально)
var ajax = require('component-ajax'),
    Promise = require('es6-promise').Promise;

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
    },
    tasks: {
        save: function (task) {
            var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(task);
                }, 0);
            });
        },

        get: function () {
            var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            return new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(tasks);
                }, 0);
            });
        }
    }
};

module.exports = api;