'use strict'

var homeController = require('../controllers/home'),
    accountController = require('../apiControllers/accountController');

var routes = function (app, passport) {
    app.post('/api/auth/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup'
    }));

    app.post('/api/auth/login', function (req, res, next) {
        passport.authenticate('local-login', function (error, user, info) {
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
            });


        })(req, res, next);
    });

    app.post('/api/auth/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

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
