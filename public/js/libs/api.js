"use strict"

//TODO: сделать как то нормально)
var ajax = require('component-ajax'),
    dater = require('libs/dater');

var sendRequest = function (url, callback) {
    ajax.get('/api/' + url, function (res) {
        var result = JSON.parse(res);
        callback(result);
    });
};

var sendPostRequest = function (url, data, callback) {
    ajax.post('/api/' + url, data, function (res) {
        var result = JSON.parse(res);
        callback(result);
    });
};

var trimCallback = function (callback) {
    return callback || function () {
        
    };
};

var api = {
    auth: {
        login: function (data, callback) {
            sendPostRequest('auth/login', data, function (result) {
                callback(result);
            })
        }
    },

    account: {
        isAuthorized: function (callback) {
            sendRequest('account/isAuthorized', function (result) {
                callback(result);
            });
        }
    },
    tasks: {
        save: function (task, callback) {
            var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            setTimeout(function () {
                trimCallback(callback)(task);
            }, 0);
        },

        get: function (callback) {
            var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(function (task) {
                task.date = dater.parse(task.date);
            });

            setTimeout(function () {
                trimCallback(callback)(tasks);
            }, 0);
        }
    }
};

module.exports = api;