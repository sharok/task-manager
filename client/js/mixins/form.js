var lzSentences = require('localization').get('sentences'),
    validator = require('../../../common/libs/validator'),
    authorizer = require('libs/authorizer'),
    React = require('react');

var form = {

    getInitialState: function () {
        return {
            isSubmitting: false,
            validationMessage: '',
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
        this.setState({
            validationMessage: message
        })
    },

    makeInvalid: function (elemName) {

        var inputs = this.state.inputs;

        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].name === elemName) {
                inputs[i].isInvalid = true;
                this.showValidationError(inputs[i].validateMessage);
            }
        }

        this.setState({inputs: inputs});
    },

    validateForm2: function () {
        for (var i = 0; i < this.state.inputs.length; i++) {
            debugger;
            var currentInput = this.state.inputs[i];
            //var inputValue = this.refs[currentInput.name].getDOMNode().value.trim();
            var inputValue = this.formConfig.data[currentInput.name];
            if (!currentInput.validate(inputValue)) {
                this.makeInvalid(currentInput.name);
                return false;
            }
        }

        return true;
    },

    submitForm: function () {
        var that = this;
        this.state.action(this.getFormData(), function (result) {
            // ��� ��� ����� ������� ����� ��� callback �����������, �.� � ������ ���� ����� ���� ������ ��������

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