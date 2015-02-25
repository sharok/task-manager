"use strict"

var React = require('react'),
    Header = require('./header.jsx'),
    FormContainer = require('./form-container.jsx');

var WelcomeLayout = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
            </div>
        )
    }
});

module.exports = WelcomeLayout;