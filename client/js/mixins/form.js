var
    React = require('react'),
    lzSentences = require('localization').get('sentences'),
    validator = require('../../../common/libs/validator'),
    authorizer = require('libs/authorizer'),
    _ = require('lodash'),
    route = require('page');


var
    form = {
        getInitialState: function () {
            return {
                isSubmitting: false,
                validationSummary: '',
                inputs: []
            }
        },

        componentDidMount: function () {
            for (var input in this.formConfig.inputs) {
                var inputProperties = this.formConfig.inputs[input];
                this.setupInputs(input, inputProperties.validate, inputProperties.validateMessage)
            }
        },

        propertyIsDefined: function (object, property) {
            if (!_.has(object, property)) {
                throw new Error('unknown input name: ' + property);
            }
        },

        getInputValue: function (inputName) {
            var inputValues = this.state.inputValues;

            this.propertyIsDefined(inputValues, inputName);

            return inputValues[inputName];
        },

        setInputValue: function (inputName, value) {

            var inputValues = this.state.inputValues;

            this.propertyIsDefined(inputValues, inputName);

            inputValues[inputName] = value;
            this.setState({inputValues: inputValues})
        },

        onChangeInput: function (inputName, e) {
            this.setInputValue(inputName, e.target.value);
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

        enableForm: function (enable) {
            this.setState({
                isSubmitting: !enable
            });
        },

        setupInputs: function (inputName, validate, validationMessage) {
            var inputs = this.state.inputs;
            inputs.push({name: inputName, isInvalid: false, validate: validate, validateMessage: validationMessage});
            this.setState({
                inputs: inputs
            });
        },

        resetInvalid: function () {
            var inputs = this.state.inputs;

            inputs.forEach(function (item) {
                item.isInvalid = false;
            });

            this.setState({inputs: inputs, validationSummary: '', isInvalidForm: false});
        },

        buildSummaryValidationMessage: function () {
            var summaryMessage = '';

            for (var i = 0, len = this.state.inputs.length; i < len; i++) {
                if (this.state.inputs[i].isInvalid) {
                    summaryMessage += this.state.inputs[i].validateMessage;
                }
            }

            this.setSummaryValidationMessage(summaryMessage);
        },

        setSummaryValidationMessage: function (message) {
            this.setState({
                validationSummary: message
            });
        },

        validateForm: function () {
            var formIsValid = true,
                inputs = this.state.inputs;

            for (var i = 0, len = inputs.length; i < len; i++) {
                var currentInput = inputs[i];
                var inputValue = this.getInputValue(currentInput.name);
                if (!currentInput.validate.call(this, inputValue)) {
                    formIsValid = false;
                    inputs[i].isInvalid = true;
                }
            }

            this.setState({inputs: inputs});

            if (!formIsValid) {
                this.buildSummaryValidationMessage();
            }

            return formIsValid;
        },

        handleServerValidationErrors: function (serverResponse) {
            var inputs = this.state.inputs;

            serverResponse.inputs.forEach(function (serverInput) {
                for (var i = 0, len = inputs.length; i < len; i++) {
                    if (inputs[i].name === serverInput) {
                        inputs[i].isInvalid = true;
                    }
                }
            });

            this.setState({
                inputs: inputs
            });
        },

        submitForm: function () {
            var that = this;
            this.resetInvalid();
            this.enableForm(false);

            if (!this.validateForm()) {
                this.enableForm(true);
                return;
            }

            var formData = this.formConfig.data.bind(this)();

            this.formConfig.action(formData, function (result) {
                // всю эту часть наверно лучше как callback прокидывать, т.к у разных форм могут быть разные действия

                if (result.success) {
                    authorizer.init(function () {
                        route('/');
                    });
                }
                else {
                    that.handleServerValidationErrors(result);
                    that.setSummaryValidationMessage(result.message);
                    that.enableForm(true);
                }
            })
        }
    };

module.exports = form;