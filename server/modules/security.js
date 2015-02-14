'use strict'

var security = {
    apiUserLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.status(401).send({error: 'User is not authenticated'})

    },

    siteUserLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/');

    }

}

module.exports = security;