"use strict"

var React = require('react'),
    assign = require('object-assign'),
    lz = require('localization').get(),
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

    handleClick: function (ans) {
        this.fadeOut(function () {
            this.props.resolve(ans);
        }.bind(this));
    },

    render: function () {
        var popup = this.popup = assign({
            title: lz.CONFIRM + '?',
            detail: null,
            no: lz.NO,
            yes: lz.YES,
            defaultValue: true
        }, this.props.popup);

        var detail = popup.detail == null ? '' :  <small>{ popup.detail }</small>;

        return (<div className={ this.animateCs('base:popup; fadeIn:reduce duration-200ms; fadeOut:reduce-out duration-200ms') }>
            <header>
                <strong>{ popup.title }</strong>
                { detail }
            </header>
            <section className="text-right">
                <button className="modal-button" onClick={ this.handleClick.bind(this, false) } autoFocus={ !popup.defaultValue }>{ popup.no }</button>
                <button className="modal-button" onClick={ this.handleClick.bind(this, true)  } autoFocus={ popup.defaultValue }>{ popup.yes }</button>
            </section>
        </div>);
    }
});

module.exports = Confirm;

