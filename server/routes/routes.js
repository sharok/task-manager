'use strict'

var homeController = require('../controllers/home'),
    accountController = require('../apiControllers/accountController');

var routes = function (app, passport) {
    app.post('/auth/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup'
    }));

    app.post('/auth/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //TODO: move the mapping api in a separate file

    app.get('/api/account/isAuthorized', accountController.isAuthorized);

    app.get('/', homeController.index());
    app.get('/about', homeController.index());
    app.get('/login', homeController.index());
    app.get('/signup', homeController.index());
    app.get('/tasks', homeController.index());
    app.get('/profile', homeController.index());
};

module.exports = routes;
