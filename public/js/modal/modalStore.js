"use strict"

var assign = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    ACTIONS = require('constants/actionTypes'),
    MODAL_TYPES = require('constants/modalTypes'),
    CHANGE_EVENT = 'CHANGE',

    nextId = 1,
    modals = [];

var modalStore = assign({
    get: function () {
        return modals[modals.length - 1];
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    count: function () {
        return modals.length;
    },

    push: function (modal) {
        var id = nextId;
        modals.push({
            id: id,
            type: modal.type,
            popup: modal.popup,
            resolve: modal.resolve
        });

        nextId++;

        modal.promise.then(function () {
            modals.forEach(function (modal, index) {
                if (modal.id !== id) return;
                modals.splice(index,1);
            });

            modalStore.emitChange();
        });

        modalStore.emitChange();
    }
}, EventEmitter.prototype);

module.exports = modalStore;