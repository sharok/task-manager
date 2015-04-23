"use strict"

var React = require('react'),
    mixins = require('mixins/main'),
    popupFactory = require('./popupFactory'),
    modalStore = require('./store');

var Modal = React.createClass({
    mixins: mixins('bindToStore', 'dynamicStyle'),
    bindingStores: [modalStore],

    getInitialState: function () {
        return {
            display: modalStore.count() > 0,
            modal: modalStore.get()
        }
    },

    render: function () {
        var popup = this.state.display ? popupFactory.create(this.state.modal.type, this.state.modal.resolve, this.state.modal.popup) : '';

        return (<div className={ this.cs({ 'modal-overlay': true, 'hidden': !this.state.display }) }>
            { popup }
        </div>);
    }
});

module.exports = Modal;