"use strict"

var React = require('react'),
    lz = require('localization').get(),
    ProjectLogo = require('components/welcome/project-logo.jsx'),
    LoginForm = require('components/welcome/login-form.jsx');

var Login = React.createClass({
    render: function () {
        return (<div className="content-section">
            <div className="material-block mini">
                <ProjectLogo />
                <div className="welcome-title">{ lz.LOGIN }</div>
                <LoginForm />
            </div>
        </div>);
    }
});

module.exports = Login;