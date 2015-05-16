"use strict";

var React = require('react'),
    lz = require('localization').get(),
    lzSentences = require('localization').get('sentences'),
    api = require('../libs/api'),
    authorizer = require('libs/authorizer'),
    mixins = require('mixins/main'),
    validator = require('../../../common/libs/validator'),
    WelcomeBlock = require('components/welcome/welcome-block.jsx');

var SignUp = React.createClass({
    mixins: mixins('form', 'dynamicStyle'),

    formConfig: {
        inputs: {
            email: {
                validate: function (email) {
                    return validator.checkEmail(email)
                },
                validateMessage: lzSentences.VALIDATION_WRONG_EMAIL
            },
            password: {
                validate: function (password) {
                    return validator.checkPassword(password)
                },
                validateMessage: lzSentences.VALIDATION_EMPTY_PASSWORD
            },
            confirmPassword: {
                validate: function (confirmPassword) {
                    var password = this.getInputValue('password');
                    return validator.checkConfirmPassword(password, confirmPassword)
                },
                validateMessage: lzSentences.VALIDATION_WRONG_CONFIRM_PASSWORD
            }
        },
        data: function () {
            return {
                email: this.getInputValue('email'),
                password: this.getInputValue('password'),
                confirmPassword: this.getInputValue('confirmPassword')
            };
        },
        action: api.auth.signup
    },

    getInitialState: function () {
        return {
            inputValues: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },

    init: function (welcome) {
        this.props.onInit(welcome);
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.submitForm()
    },

    render: function () {
        return (<WelcomeBlock onInit={ this.init } title={ lz.SIGN_UP }>
            { this.state.validationSummary ?
                <div className="error-message"><span>{this.state.validationSummary}</span></div>
                : null }

            <form className="public-form" onSubmit={this.handleSubmit}>
                <section>
                    <label className="public-label">{ lz.LOGIN }</label>
                    <input name="email" type="text" className={ this.buildClassName('email') }
                           value={ this.getInputValue('email') }
                           onChange={ this.onChangeInput.bind(this, 'email') }/>

                    <label className="public-label margin-top">{ lz.PASSWORD }</label>
                    <input name="password" type="password" className={ this.buildClassName('password') }
                           value={ this.getInputValue('password') }
                           onChange={ this.onChangeInput.bind(this, 'password') }/>

                    <label className="public-label margin-top">{ lz.CONFIRM_PASSWORD }</label>
                    <input name="confirmPassword" type="password" className={ this.buildClassName('confirmPassword') }
                           value={ this.getInputValue('confirmPassword') }
                           onChange={ this.onChangeInput.bind(this, 'confirmPassword') }/>
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