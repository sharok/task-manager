"use strict"

var invariant = require('invariant');

var bindToStore = {
    _listenStore: function (store, callback) {
        var changeCallback = function () {
            if (this.isMounted()) {
                callback();
            } else {
                store.removeChangeListener(changeCallback);
            }
        }.bind(this);

        store.addChangeListener(changeCallback);
    },

    componentWillMount: function () {
        var that = this,
            stores = that.bindingStores || [];

        stores.forEach(function (store) {
            that._listenStore(store, function () {
                invariant(that.getInitialState, 'initial state must be defined in binding to store component');
                that.setState(that.getInitialState());

                if (typeof that.onStoreChange !== 'undefined'){
                    that.onStoreChange();
                }
            });
        });
    }
};

module.exports = bindToStore;