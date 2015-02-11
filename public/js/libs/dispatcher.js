"use strict";

var invariant = require('invariant'),
    assign = require('object-assign'),
    _lastID = 1,
    _prefix = 'ID_';

var Dispatcher = function () {
    this._callbacks = {};
    this._isPending = {};
    this._isHandled = {};
    this._isDispatching = false;
    this._pendingPayload = null;
};

assign(Dispatcher.prototype, {
    register: function (callback) {
        var id = _prefix + _lastID++;
        this._callbacks[id] = callback;

        return id;
    },

    unregister: function (id) {
        invariant(
            this._callbacks[id],
            'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
            id
        );
        delete this._callbacks[id];
    },

    waitFor: function (ids) {
        invariant(this._isDispatching, 'Dispatcher.waitFor(...): Must be invoked while dispatching.');

        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];

            if (this._isPending[id]) {
                invariant(
                    this._isHandled[id],
                    'Dispatcher.waitFor(...): Circular dependency detected while ' +
                    'waiting for `%s`.',
                    id
                );
                continue;
            }

            invariant(
                this._callbacks[id],
                'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
                id
            );

            this._invokeCallback(id);
        }
    },

    dispatch: function (payload) {
        invariant(
            !this._isDispatching,
            'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
        );
        this._startDispatching(payload);

        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        } finally {
            this._stopDispatching();
        }
    },

    isDispatching: function () {
        return this._isDispatching;
    },

    _invokeCallback: function (id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    },

    _startDispatching: function (payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    },

    _stopDispatching: function () {
        this._pendingPayload = null;
        this._isDispatching = false;
    }
});

module.exports = Dispatcher;