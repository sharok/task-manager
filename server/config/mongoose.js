var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    async = require('async'),
    db,
    models,
    model,
    init;

mongoose.connect('mongodb://localhost/taskManager');
db = mongoose.connection;

db.on('error', function (err) {
    console.log('error db connection');
});

db.once('open', function callback() {
    console.log('db connected');
});

models = {};

init = function (modelsDirectory, callback) {
    var schemaList = fs.readdirSync(modelsDirectory);

    async.each(schemaList, function (item, cb) {
        var modelName = path.basename(item, '.js'),
            schema = require(path.join(modelsDirectory, modelName));

        models[modelName] = mongoose.model(modelName, schema.model);
        cb();
    }, callback);
};

model = function (modelName) {
    var name = modelName.toLowerCase();

    if (typeof models[name] == 'undefined') {
        throw 'Model "' + name + '" is not exist';
    }

    return models[name];
};

module.exports = {
    init: init,
    model: model
};