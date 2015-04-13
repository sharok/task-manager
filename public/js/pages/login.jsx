"use strict"

var React = require('react'),
    lz = require('localization').get(),
    api = require('../libs/api'),
    WelcomeBlock = require('components/welcome/welcome-block.jsx');

var Login = React.createClass({
    getInitialState: function () {
        return {
            email: '',
            password: '',
            isSubmitting: false
        }
    },

    init: function (welcome) {
        this.props.onInit(welcome);
    },

    changeEmail: function (e) {
        this.setState({
            email: e.target.value
        });
    },

    changePassword: function (e) {
        this.setState({
            password: e.target.value
        });
    },

    disableSubmitButton: function () {
        this.setState({
            isSubmitting: true
        });
    },

    enableSubmitButton: function () {
        this.setState({
            isSubmitting: false
        });
    },

    handleSubmit: function (e) {
        e.preventDefault();

        this.disableSubmitButton();

        var email = this.state.email.trim();
        var password = this.state.password.trim();
        var data = {
            email: email,
            password: password
        };

        var that = this;
        api.auth.login(data, function (result) {
            if (result.success) {
                window.location.href = "/";
            }
            else {
                //TODO show validation error
            }
            that.enableSubmitButton();
        });
    },

    render: function () {
        return (<WelcomeBlock onInit={ this.init } title={ lz.LOGIN }>
            <form className="public-form" onSubmit={this.handleSubmit}>
                <section>
                    <label className="public-label">{ lz.LOGIN }</label>
                    <input name="email" type="text" className="public-input" value={ this.state.email }
                           onChange={ this.changeEmail }/>

                    <label className="public-label margin-top">{ lz.PASSWORD }</label>
                    <input name="password" type="password" className="public-input" value={ this.state.password }
                           onChange={ this.changePassword }/>
                </section>
                <section className="text-center">
                    <input type="submit" className="base-button" disabled={this.state.isSubmitting} value={ lz.ENTER }/>
                </section>
            </form>
        </WelcomeBlock>);
    }
});

module.exports = Login;