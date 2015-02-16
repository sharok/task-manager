'use strict'

var security = {
    checkApiUserIsAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.status(401).send({error: 'User is not authenticated'})

    },

    checkSiteUserIsAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/login');

    }

};

module.exports = security;