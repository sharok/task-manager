"use strict"

var React = require('react'),
    lz = require('localization').get(),
    lzSentences = require('localization').get('sentences'),
    api = require('../libs/api'),
    route = require('page'),
    authorizer = require('libs/authorizer'),
    mixins = require('mixins/main'),
    validator = require('../../../common/libs/validator'),
    WelcomeBlock = require('components/welcome/welcome-block.jsx');

var Login = React.createClass({
    mixins: mixins('form', 'dynamicStyle'),

    getInitialState: function () {
        return {
            email: '',
            password: ''
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
            var email = this.state.email,
                password = this.state.password;
            return {
                email: email,
                password: password
            };
        },
        action: api.auth.login
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

    handleSubmit: function (e) {
        e.preventDefault();
        this.submitForm();
    },

    buildClassName: function (inputName) {
        var isInvalid = false;
        this.state.inputs.forEach(function (item) {
            if (item.name === inputName) {
                isInvalid = item.isInvalid;
                return;
            }
        });

        return this.cs({'public-input': true, 'error-input': isInvalid})
    },

    render: function () {
        return (<WelcomeBlock onInit={ this.init } title={ lz.LOGIN }>

            { this.state.validationSummary ?
                <div className="error-message"><span>{this.state.validationSummary}</span></div>
                : null }


            <form className="public-form" onSubmit={this.handleSubmit}>
                <section>
                    <label className="public-label">{ lz.LOGIN }</label>
                    <input name="email" type="text" className={this.buildClassName('email')}
                           value={ this.state.email }
                           onChange={ this.changeEmail }/>

                    <label className="public-label margin-top">{ lz.PASSWORD }</label>
                    <input name="password" type="password" className={this.buildClassName('password')}
                           value={ this.state.password }
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