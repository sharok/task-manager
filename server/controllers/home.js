UserRepo = require('./../modules/repo')('user');

module.exports = {
    index: function (params) {
        params = params || {
            title: 'Task Manager'
        };

        return function (req, res, next) {
            res.render('index', params);
        }
    }
};