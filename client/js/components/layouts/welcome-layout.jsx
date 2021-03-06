"use strict"

var React = require('react'),
    HeaderMenu = require('components/welcome/header-menu');

var WelcomeLayout = React.createClass({
    render: function () {
        return (<div className="overflow-hidden">
            <HeaderMenu />
            <div>
             { this.props.children }
            </div>
        </div>)
    }
});

module.exports = WelcomeLayout;