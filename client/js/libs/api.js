"use strict"

var dater = require('libs/dater'),
    invariant = require('invariant'),
    assign = require('object-assign');

var sendRequest = function (url, callback) {
    var ajax = require('component-ajax');

    ajax.get('/api/' + url, function (res) {
        var result = JSON.parse(res);
        callback(result);
    });
};

var sendPostRequest = function (url, data, callback) {
    var ajax = require('component-ajax');
    
    ajax.post('/api/' + url, data, function (res) {
        var result = JSON.parse(res);
        callback(result);
    });
};

var trimCallback = function (callback) {
    return callback || function () {
        
    };
};

var getAllTasks = function () {
   var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

   tasks.forEach(function (task) {
        task.date = dater.parse(task.date);
    });

   return tasks;
};

var setAllTasks = function (tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

var generataId = function (prevTask) {
    if (typeof prevTask === 'undefined') {
        return 1;
    }

    return prevTask._id + 1;
};

var api = {
    auth: {
        login: function (data, callback) {
            sendPostRequest('auth/login', data, function (result) {
                callback(result);
            })
        },

        signup: function (data, callback) {
            sendPostRequest('auth/signup', data, function (result) {
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
            var tasks = getAllTasks();
            task._id = generataId(tasks[tasks.length - 1]);
            tasks.push(task);
            
            setTimeout(function () {
                setAllTasks(tasks);
                trimCallback(callback)(task);
            }, 0);
        },

        get: function (callback) {
            var tasks =getAllTasks();            

            setTimeout(function () {
                trimCallback(callback)(tasks);
            }, 0);
        },

        update: function (id, task, callback) {
            if (typeof id === 'object') {
                callback = task;
                task = id;
                id = task._id;
            }

            var tasks = getAllTasks(),
                existing = tasks.filter(function (t) {
                    return t._id === id; 
                })[0];
                
            invariant(existing, 'task with _id `%s` was not found', id);
            assign(existing, task);

            setTimeout(function () {
                setAllTasks(tasks);
                trimCallback(callback)(existing);
            }, 0);
        }           
    }
};

module.exports = api;