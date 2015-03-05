"use strict"

var React = require('react'),
    assign = require('object-assign'),
    mixins = require('mixins/main');

var Confirm = React.createClass({
    mixins: mixins('dynamicStyle'),

    getInitialState: function () {
        return {
            display: 'fadeIn'
        }
    },

    fadeOut: function (cb) {
        this.state.display = 'fadeOut';
        this.setState(this.state);
        setTimeout(cb, 200);
    },

    clickNo: function () {
        this.fadeOut(function () {
            this.props.resolve(false);
        }.bind(this));
    },

    clickYes: function () {
        this.fadeOut(function () {
            this.props.resolve(true);
        }.bind(this));
    },

    render: function () {
        var popup = this.popup = assign({
            title: 'confirm?',
            detail: null,
            no: 'no',
            yes: 'yes',
            defaultValue: true
        }, this.props.popup);

        var detail = popup.detail == null ? '' :  <small>{ popup.detail }</small>;

        return (<div className={ this.animateCs('base:popup; fadeIn:reduce duration-200ms; fadeOut:reduce-out duration-200ms') }>
            <header>
                <strong>{ popup.title }</strong>
                { detail }
            </header>
            <section className="text-right">
                <button className="modal-button" onClick={ this.clickNo } autoFocus={ !popup.defaultValue }>{ popup.no }</button>
                <button className="modal-button" onClick={ this.clickYes } autoFocus={ popup.defaultValue }>{ popup.yes }</button>
            </section>
        </div>);
    }
});

module.exports = Confirm;

