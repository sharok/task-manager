"use strict"

var React = require('react'),
    lz = require('localization').get(),
    api = require('../libs/api'),
    route = require('page'),
    WelcomeBlock = require('components/welcome/welcome-block.jsx');

var SignUp = React.createClass({
    init: function (welcome) {
        this.props.onInit(welcome);
    },

    getInitialState: function () {
        return {
            isSubmitting: false,
            validationMessage: ''
        }
    },

    enableForm: function (enable) {
        this.setState({
            isSubmitting: !enable
        });
    },

    showValidationError: function (message) {
        this.setState({
            validationMessage: message
        })
    },

    handleSubmit: function (e) {
        e.preventDefault();

        this.enableForm(false);

        var email = this.refs.email.getDOMNode().value.trim();
        var password = this.refs.password.getDOMNode().value.trim().trim();
        var confirmPassword = this.refs.confirmPassword.getDOMNode().value.trim().trim();
        var data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        var that = this;
        api.auth.signup(data, function (result) {
            if (result.success) {
                route('/');
            }
            else {
                that.showValidationError(result);
                that.enableForm(true);
            }
        });
    },

    render: function () {
        return (<WelcomeBlock  onInit={ this.init } title={ lz.SIGN_UP }>
            { this.state.validationMessage ?
                <div className="error-container"><span>{this.state.validationMessage}</span></div>
                : null }

            <form className="public-form" onSubmit={this.handleSubmit}>
                <section>
                    <label className="public-label">{ lz.LOGIN }</label>
                    <input ref="email" name="email" type="text" className="public-input"/>

                    <label className="public-label margin-top">{ lz.PASSWORD }</label>
                    <input ref="password" name="password" type="password" className="public-input"/>

                    <label className="public-label margin-top">{ lz.CONFIRM_PASSWORD }</label>
                    <input ref="confirmPassword" name="confirmPassword" type="password" className="public-input"/>
                </section>
                <section className="text-center">
                    <input type="submit" className="base-button" disabled={this.state.isSubmitting}
                           value={ lz.REGISTER }/>
                </section>
            </form>
        </WelcomeBlock>);
    }
});

module.exports = SignUp;