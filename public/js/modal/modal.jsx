"use strict"

var React = require('react'),
    mixins = require('mixins/main'),
    windowFactory = require('./windowFactory'),
    modalStore = require('./modalStore');

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
        var modal = this.state.display ? windowFactory.create(this.state.modal.type, this.state.modal.resolve, this.state.modal.popup) : '';

        return (<div className={ this.cs({ 'modal-overlay': true, 'hidden': !this.state.display }) }>
            { modal }
        </div>);
    }
});

module.exports = Modal;