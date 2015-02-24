'use strict'

var homeController = require('../controllers/home'),
    accountController = require('../apiControllers/accountController');

var routes = function (app, passport) {

    app.get('/', homeController.index({title: 'Task Manager'}));

    app.post('/auth/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup'
    }));

    app.post('/auth/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    }));

    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //TODO: move the mapping api in a separate file

    app.get('/api/account/isAuthorized', accountController.isAuthorized);

    //TODO: this line is only for testing
    app.get('/:no', homeController.index({title: 'Task Manager'}));
};

module.exports = routes;
