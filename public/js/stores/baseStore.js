"use strict"

var EventEmitter = require('events').EventEmitter,
    invariant = require('invariant'),
    assign = require('object-assign'),
    appDispatcher = require('appDispatcher'),
    CHANGE_EVENT = 'CHANGE';

var BaseStore = function (store) {
    invariant(store.setupActions, 'you must setup actions to store');

    var actions = {};
    var mapAction = function (actionName, callback) {
        actions[actionName] = callback;
    };
    var invokeAction = function (actionName, payload) {
        invariant(actions[actionName], 'undefined store action `%s`', actionName);
        actions[actionName](payload);
    };

    store.setupActions(mapAction, invokeAction);
    delete store.setupActions;

    var childrenStore = assign({

        emitChange: function () {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback);
        },
        
        removeChangeListener: function (callback) {
            this.removeListener(CHANGE_EVENT, callback);
        },
        
        dispatcherToken: appDispatcher.register(function (payload) {
            var action = actions[payload.action.type];

            if (typeof action == 'undefined') return;

            action(payload);
            childrenStore.emitChange();
        })

    }, EventEmitter.prototype, store);

    return childrenStore;
};

module.exports = BaseStore;