"use strict"

var invariant = require('invariant'),
    assign = require('object-assign');

var bindToStore = {
    _listener: function (store) {
        invariant(this.getInitialState, 'initial state must be defined in binding to store component');
        var that = this;

        var listener = function () {
            if (that.isMounted()) {
                that.setState(that.getInitialState());
            } else {
                store.removeChangeListener(listener);
            }
        };

        return listener;
    },
    
    componentWillUnmount: function () {
        var i;

        for (i = 0; i < this._bindingStores.length; i++) {
            this._bindingStores[i].removeChangeListener(this._listeners[i]);
        }
    },

    componentWillMount: function () {
        var that = this,
            _listeners = [],
            _bindingStores = that.bindingStores || [];

        _bindingStores.forEach(function (store) {
            var listener = that._listener(store);
            store.addChangeListener(listener);
            _listeners.push(listener)
        });

        assign(this, {
            _listeners: _listeners,
            _bindingStores: _bindingStores
        });
    }
};

module.exports = bindToStore;