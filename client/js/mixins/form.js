var lzSentences = require('localization').get('sentences'),
    validator = require('../../../common/libs/validator'),
    authorizer = require('libs/authorizer'),
    React = require('react');

var form = {
    formSettings: {},

    getInitialState: function () {
        return {
            isSubmitting: false,
            validationMessage: '',
            inputs: [],
            action: null
        }
    },

    enableForm: function (enable) {
        this.setState({
            isSubmitting: !enable
        });
    },

    setupInputs: function (inputName, validator) {
        var inputs = this.state.inputs;
        inputs.push({name: inputName, isInvalid: false, validator: validator});
        this.setState({
            inputs: inputs
        });
    },

    showValidationError: function (message) {
        this.setState({
            validationMessage: message
        })
    },

    validateForm2: function () {
        for (var i = 0; i < this.state.inputs.length; i++) {
            var currentInput = this.state.inputs[i];
            var inputValue = this.refs[currentInput.name].getDOMNode().value.trim();
            if (!currentInput.validator(inputValue)) {
                return false;
            }
        }

        return true;
    },

    submitForm: function () {
        var that = this;
        this.state.action(this.getFormData(), function (result) {
            // всю эту часть наверно лучше как callback прокидывать, т.к у разных форм могут быть разные действия

            if (result.success) {
                authorizer.init(function () {
                    route('/');
                });
            }
            else {
                that.showValidationError(result);
                that.enableForm(true);
            }
        })
    },

    validateForm: function (email, password, confirmPassword) {
        //if (!validator.checkEmail(email)) {
        //    this.showValidationError(lzSentences.VALIDATION_WRONG_EMAIL);
        //    return false;
        //}

        if (password === '') {
            this.showValidationError(lzSentences.VALIDATION_EMPTY_PASSWORD);
            return false;
        }

        if (confirmPassword !== undefined) {
            if (!validator.checkPasswords(password, confirmPassword)) {
                this.showValidationError(lzSentences.VALIDATION_WRONG_CONFIRM_PASSWORD);
                return false;
            }
        }

        return true;
    }

};

module.exports = form;