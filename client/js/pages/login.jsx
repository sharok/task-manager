"use strict";

var React = require('react'),
    lz = require('localization').get(),
    lzSentences = require('localization').get('sentences'),
    api = require('../libs/api'),
    authorizer = require('libs/authorizer'),
    mixins = require('mixins/main'),
    validator = require('../../../common/libs/validator'),
    WelcomeBlock = require('components/welcome/welcome-block'),
    ErrorMessage = require('components/common/error-message');

var Login = React.createClass({
    mixins: mixins('form', 'dynamicStyle'),

    getInitialState: function () {
        return {
            inputValues: {
                email: '',
                password: ''
            }
        }
    },

    init: function (welcome) {
        this.props.onInit(welcome);
    },

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
            }
        },
        data: function () {
            return {
                email: this.getInputValue('email'),
                password: this.getInputValue('password')
            };
        },
        action: api.auth.login
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.submitForm();
    },

    render: function () {
        return (<WelcomeBlock onInit={ this.init } title={ lz.LOGIN }>

            <ErrorMessage message={this.state.validationSummary}/>

            <form className="public-form" onSubmit={this.handleSubmit}>
                <section>
                    <label className="public-label">{ lz.LOGIN }</label>
                    <input name="email" type="text" className={this.buildClassName('email')}
                           value={ this.getInputValue('email') }
                           onChange={ this.onChangeInput.bind(this, 'email') }/>

                    <label className="public-label margin-top">{ lz.PASSWORD }</label>
                    <input name="password" type="password" className={this.buildClassName('password')}
                           value={ this.getInputValue('password') }
                           onChange={ this.onChangeInput.bind(this, 'password') }/>

                </section>
                <section className="text-center">
                    <input type="submit" className="base-button" disabled={this.state.isSubmitting} value={ lz.ENTER }/>
                </section>
            </form>

        </WelcomeBlock>);
    }
});

module.exports = Login;