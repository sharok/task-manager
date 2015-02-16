'use strict'

var LocalStrategy = require('passport-local').Strategy,
    db = require('../config/mongoose'),
    UserRepo = require('../modules/repo')('user');

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

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        //вынести функции любо в переменную выше, либо в отдльеный, лучше 1 вариант
        function (req, email, password, done) {

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

        }));


    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            //тоже самое, что и с callback'ом входа, большая вложенность
            process.nextTick(function () {
                UserRepo.getOne({'local.email': email}).done(function (user) {
                        if (user) {
                            return done(null, false);
                        } else {

                            //вынести функцию создания пользователя в отдельный модуль, будут несколько
                            //стратегий входа, тут надо будет просто выбирать нужную и вызвать
                            //метод createUser
                            //скорее всего тип такого: createUser(<strategy>, <params>)
                            var newUser = new db.model('user')();

                            newUser.local = {
                                email: email,
                                password: t.generateHash(password)
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

module.exports = passport;

