"use strict"

var React = require('react'),
    Header = require('./header.jsx');

var WelcomeLayout = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <div className="welcome-content-block">
                { this.props.children }
                </div>

            </div>
        )
    }
});

module.exports = WelcomeLayout;