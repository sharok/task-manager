'use strict'

var security = {
    isAuthenticated: function (req) {
        return req.isAuthenticated();
    },

    checkApiUserIsAuthenticated: function (req, res, next) {
        if (security.isAuthenticated(req)) {
            return next();
        }

        res.status(401).send({error: 'User is not authenticated'})

    },

    checkSiteUserIsAuthenticated: function (req, res, next) {
        if (security.isAuthenticated(req)) {
            return next();
        }

        res.redirect('/login');
    }
};

module.exports = security;