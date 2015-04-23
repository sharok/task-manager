"use strict"

var React = require('react'),
    lz = require('localization').get(),
    WelcomeBlock = require('components/welcome/welcome-block.jsx');

var Login = React.createClass({
    init: function (welcome) {
        this.props.onInit(welcome);
    },

    render: function () {
        return (<WelcomeBlock onInit={ this.init } title={ lz.ABOUT_PROJECT }>
            <div className="content-section">
                <img src="/img/ava.jpg" width="100%" />
            </div>
        </WelcomeBlock>);
    }
});

module.exports = Login;