//var homeController = require('./../controllers/home')
//var map = function (app) {
//    app.get('/', homeController.index({title: 'Task Manager'}));
//};
//
//module.exports = {
//    map: map
//};

module.exports = function (app, passport) {
    var homeController = require('./../controllers/home'),
        authController = require('./../controllers/auth');

    app.get('/', homeController.index({title: 'Task Manager'}));

    app.get('/login', authController.login());

    app.get('/signup', authController.signup());

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: false
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: false
    }));
}