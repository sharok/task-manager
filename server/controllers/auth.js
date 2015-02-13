UserRepo = require('./../modules/repo')('user');

module.exports = {
    login: function () {
        return function (req, res) {
            res.render('login');
        }
    },

    signup: function () {
        return function (req, res) {
            res.render('signup');
        }
    }
};