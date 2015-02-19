"use strict"

var security = require('../modules/security');

var accountController = {
    isAuthorized: function (req, res, next) {
        if (security.isAuthenticated(req)) {
            res.send({ result: 1 });
        } else {
            res.send({ result: 0 });
        }
    }
};

module.exports = accountController;