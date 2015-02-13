var LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user'),
    UserRepo = require('../modules/repo')('user');

module.exports = function (passport) {
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

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            UserRepo.getOne({'local.email': email}).done(function (user) {
                    if (!user)
                        return done(null, false);

                    if (!user.validPassword(password))
                        return done(null, false);

                    return done(null, user);
                },
                function (err) {
                    return done(err);
                });

        }));


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {

            process.nextTick(function () {
                UserRepo.getOne({'local.email': email}).done(function (user) {
                        if (user) {
                            return done(null, false);
                        } else {

                            var newUser = {
                                local: {
                                    email: email,
                                    password: password
                                }
                            };

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
            });

        }));
}