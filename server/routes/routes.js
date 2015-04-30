'use strict'

var homeController = require('../controllers/home'),
    accountController = require('../apiControllers/accountController');


var handleAuthenticate = function (strategy, passport, req, res, next) {
    passport.authenticate(strategy, function (error, user, info) {
        if (error) {
            return res.status(500).json(error);
        }
        if (!user) {
            return res.json(info.message);
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({success: true});
        })
    })(req, res, next);
};

var routes = function (app, passport) {

    app.post('/api/auth/signup', function (req, res, next) {
        handleAuthenticate('local-signup', passport, req, res, next);
    });

    app.post('/api/auth/login', function (req, res, next) {
        handleAuthenticate('local-login', passport, req, res, next);
    });

    app.get('/api/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //TODO: move the mapping api in a separate file

    app.get('/api/account/isAuthorized', accountController.isAuthorized);

    app.get('/', homeController.index());
    app.get('/welcome', homeController.index());
    app.get('/login', homeController.index());
    app.get('/signup', homeController.index());
    app.get('/tasks', homeController.index());
    app.get('/profile', homeController.index());
};

module.exports = routes;
