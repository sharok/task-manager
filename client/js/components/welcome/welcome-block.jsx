"use strict"

var React = require('react'),
    mixins = require('mixins/main'),
    ProjectLogo = require('components/welcome/project-logo.jsx');

var Login = React.createClass({
    mixins: mixins('dynamicStyle', 'initialized'),
    fadeOutDuration: 300,

    getInitialState: function () {
        return {
            display: 'fadeIn'
        };
    },

    init: function () {
        return {
            fadeOut: this._fadeOut
        };
    },

    render: function () {
        return (<div className={ this.animateCs('base:content-section; fadeIn:reduce duration-300ms; fadeOut:slide-right-out duration-700ms') }>
            <div className="material-block mini">
                <ProjectLogo />
                <div className="welcome-title">{ this.props.title }</div>
                { this.props.children }
            </div>
        </div>);
    }
});

module.exports = Login;