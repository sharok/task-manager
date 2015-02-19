"use strict"

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
    }
};

module.exports = bindToStore;