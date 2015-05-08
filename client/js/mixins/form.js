var lzSentences = require('localization').get('sentences'),
    validator = require('../../../common/libs/validator'),
    authorizer = require('libs/authorizer'),
    React = require('react');

var form = {

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

    showValidationError: function (message) {
        var summary = this.state.validationSummary + message;
        this.setState({
            validationSummary: summary
        });
    },

    resetInvalid: function () {
        var inputs = this.state.inputs;

        inputs.forEach(function (item) {
            item.isInvalid = false;
        });

        this.setState({inputs: inputs, validationSummary: '', isInvalidForm: false});

    },

    makeInvalid: function (elemName) {
        var inputs = this.state.inputs;

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].name === elemName) {
                inputs[i].isInvalid = true;
            }
        }
        this.setState({inputs: inputs});
    },

    validateForm2: function () {
        var formIsValid = true;
        for (var i = 0; i < this.state.inputs.length; i++) {
            var currentInput = this.state.inputs[i];
            var inputValue = this.state[currentInput.name];
            if (!currentInput.validate(inputValue)) {
                formIsValid = false;
                this.makeInvalid(currentInput.name);
            }
        }

        if (!formIsValid) {
            this.buildSummaryValidationMessage();
            this.showValidationError()
        }

        return formIsValid;
    },

    submitForm: function () {
        var that = this;
        this.resetInvalid();
        this.enableForm(false);

        if (!this.validateForm2()) {
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
                that.showValidationError(result);
                that.enableForm(true);
            }
        })
    }


};

module.exports = form;