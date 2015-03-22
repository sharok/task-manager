'use strict'

var db = require('../config/mongoose');

var userHelper = {
    createUser: function (strategy, email, password) {
        if (!strategy || !email || !password) {
            throw new Error('Passed arguments is not valid.')
        }
        var newUser = new db.model('user')();

        switch (strategy) {
            case 'local':
                newUser.local = {
                    email: email,
                    password: newUser.generateHash(password)
                };
                break;

            default:
                throw new Error('Invalid strategy.')
        }

        return newUser;
    }

};

module.exports = userHelper;