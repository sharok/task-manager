"use strict"

var EventEmitter = require('events').EventEmitter,
    invariant = require('invariant'),
    assign = require('object-assign'),
    appDispatcher = require('../appDispatcher'),
    CHANGE_EVENT = 'change';

module.exports = function (store) {
    invariant(store.setupActions, 'you must setup actions to store');

    var actions = {},
        mapAction = function (actionName, callback) {
            actions[actionName] = callback;
        };

    store.setupActions(mapAction);
    delete store.setupActions;

    var childrenStore = assign({

        emitChange: function () {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback);
        },
        
        removeChangeListener: function (callback) {
            invariant(this.CHANGE_EVENT, 'change event is undefuned');

            this.removeListener(this.CHANGE_EVENT, callback);
        },
        
        dispatcherToken: appDispatcher.register(function (payload) {
            var action = actions[payload.action.type] || function () { };

            action(payload);
            childrenStore.emitChange();
        })

    }, EventEmitter.prototype, store);

    return childrenStore;
};