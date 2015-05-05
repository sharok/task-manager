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

    init: function (welcome) {
        this.props.onInit(welcome);
    },

    componentDidMount: function () {
        this.setupInputs('email', this.validateEmail);
        this.setState({action: api.auth.login});
    },

    getFormData: function () {
        var email = this.refs.email.getDOMNode().value.trim(),
            password = this.refs.password.getDOMNode().value.trim(),
            data = {
                email: email,
                password: password
            };
        return data;
    },

    getEmailData: function () {
        return this.refs.email.getDOMNode().value.trim();
    },

    validateEmail: function (email) {
        if (!validator.checkEmail(email)) {
            this.showValidationError(lzSentences.VALIDATION_WRONG_EMAIL);
            //ставить invalid в true
            return false;
        }

        return true;
    },

    handleSubmit: function (e) {
        e.preventDefault();
        this.enableForm(false);
        debugger;
        if (!this.validateForm2()) {
            this.enableForm(true);
            return;
        }

        this.submitForm();

        //var that = this,
        //    email = this.refs.email.getDOMNode().value.trim(),
        //    password = this.refs.password.getDOMNode().value.trim(),
        //    data = {
        //        email: email,
        //        password: password
        //    };


        //if (!this.validateForm(email, password)) {
        //    this.enableForm(true);
        //    return;
        //}
        //
        //api.auth.login(data, function (result) {
        //    if (result.success) {
        //        authorizer.init(function () {
        //            route('/');
        //        });
        //    }
        //    else {
        //        that.showValidationError(result);
        //        that.enableForm(true);
        //    }
        //});
    },

    render: function () {
        return (<WelcomeBlock onInit={ this.init } title={ lz.LOGIN }>

            { this.state.validationMessage ?
                <div className="error-message"><span>{this.state.validationMessage}</span></div>
                : null }

            <form className="public-form" onSubmit={this.handleSubmit}>
                <section>
                    <label className="public-label">{ lz.LOGIN }</label>
                    <input ref="email" name="email" type="text" className="public-input"/>

                    <label className="public-label margin-top">{ lz.PASSWORD }</label>
                    <input ref="password" name="password" type="password" className="public-input"/>
                </section>
                <section className="text-center">
                    <input type="submit" className="base-button" disabled={this.state.isSubmitting} value={ lz.ENTER }/>
                </section>
            </form>

        </WelcomeBlock>);
    }
});

module.exports = Login;