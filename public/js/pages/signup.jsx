"use strict"

var React = require('react'),
    lz = require('localization').get(),
    ProjectLogo = require('components/welcome/project-logo.jsx'),
    SignupForm = require('components/welcome/signup-form.jsx');

var Login = React.createClass({
    render: function () {
        return (<div className="content-section">
            <div className="material-block mini">
                <ProjectLogo />
                <div className="welcome-title">{ lz.SIGN_UP }</div>
                <SignupForm />
            </div>
        </div>);
    }
});

module.exports = Login;