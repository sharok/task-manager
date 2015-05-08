"use strict";

var validator = {
    checkEmail: function (email) {
        if (email === '') {
            return false;
        }

        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return re.test(email);
    },

    checkPassword: function (password) {
        if (password === '') {
            return false;
        }
        return true;
    },

    checkConfirmPassword: function (password, confirmPassword) {
        if (password !== confirmPassword) {
            return false;
        }

        return true;
    }
};

module.exports = validator;
