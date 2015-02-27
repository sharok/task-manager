"use strict"

var invariant = require('invariant');

var bindToStore = {
    onStoreChange: function (store, callback) {
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
            that.onStoreChange(store, function () {
                invariant(that.getInitialState, 'initial state must be defined in binding to store component');
                that.setState(that.getInitialState());
            });
        })
    }
};

module.exports = bindToStore;