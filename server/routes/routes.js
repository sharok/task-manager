'use strict'

var homeController = require('../controllers/home'),
    authController = require('../controllers/auth'),
    accountController = require('../apiControllers/accountController'),
    security = require('../modules/security');

var routes = function (app, passport) {

    app.get('/', security.checkSiteUserIsAuthenticated, homeController.index({title: 'Task Manager'}));

    app.get('/login', authController.login());

    app.get('/signup', authController.signup());

    //TODO: добавить префикс /auth/
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

    //TODO: вынести mapping api в отдельный файл

    app.get('/api/account/isAuthorized', accountController.isAuthorized);
};

module.exports = routes;
