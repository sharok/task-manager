'use strict'

var LocalStrategy = require('passport-local').Strategy,
    db = require('../config/mongoose'),
    UserRepo = require('../modules/repo')('user'),
    UserHelper = require('../modules/userHelper');

var passport = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (userId, done) {
        UserRepo.getById(userId).done(function (user) {
            done(null, user);
        }, function (error) {
            done(error);
        });
    });

    var loginUser = function (req, email, password, done) {
        UserRepo.getOne({'local.email': email}).done(function (user) {
                //кинуть ошибку если пользователь не найден вместо null
                if (!user)
                    return done(null, false);

                if (!user.validPassword(password))
                    return done(null, false);

                return done(null, user);
            },
            function (err) {
                return done(err);
            });
    };

    var signupUser = function (req, email, password, done) {
        UserRepo.getOne({'local.email': email}).done(function (user) {
                if (user) {
                    return done(null, false);
                } else {

                    var newUser = UserHelper.createUser('local', email, password);

                    UserRepo.save(newUser, function (user) {
                        done(null, user);
                    }, function (error) {
                        done(error);
                    });
                }
            },
            function (err) {
                return done(err);

            });
    }

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        loginUser
    ));


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        }, signupUser
    ));
}

module.exports = passport;

