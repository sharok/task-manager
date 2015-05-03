var lzSentences = require('localization').get('sentences'),
    validator = require('../../../common/libs/validator');

var form = {
    getInitialState: function () {
        return {
            isSubmitting: false,
            validationMessage: '',

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

    addErrorClass: function () {

    },

    validateForm: function (email, password, confirmPassword) {
        if (!validator.checkEmail(email)) {
            this.showValidationError(lzSentences.VALIDATION_WRONG_EMAIL);
            return false;
        }

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