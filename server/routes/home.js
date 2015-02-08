var homeController = require('./../controllers/home')

var map = function (app) {
    app.get('/', homeController.index({title: 'Task Manager'}));
};

module.exports = {
    map: map
};