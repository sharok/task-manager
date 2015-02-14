'use strict'

var homeController = require('../controllers/home'),
    authController = require('../controllers/auth'),
    security = require('../modules/security');

var routes = function (app, passport) {

    app.get('/', security.checkSiteUserIsAuthenticated, homeController.index({title: 'Task Manager'}));

    app.get('/login', authController.login());

    app.get('/signup', authController.signup());

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

}

module.exports = routes;
