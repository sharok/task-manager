var mongoose = require('mongoose'),
    db = require('./../config/mongoose');

module.exports = function (modelName) {
    var Model = db.model(modelName),
        done = function (callback, errorCallback) {
            errorCallback = errorCallback || function () {
                console.log(error.message);
            };

            this.exec(function (error, data) {
                if (error) {
                    errorCallback(error);
                    return;
                }

                callback(data);
            });
        };

    return {
        getById: function (id) {
            var query = Model.findOne({_id: id});
            query.done = done;

            return query;
        },

        get: function (params, callback) {
            var query = Model.find(params);
            query.done = done;

            return query;
        },

        getOne: function (params, callback) {
            var query = Model.findOne(params);
            query.done = done;

            return query;
        },

        save: function (model, callback, errorCallback) {
            errorCallback = errorCallback || function (error) {
                console.log(error.message);
            };

            Model.create(model, function (error, data) {
                if (error) {
                    errorCallback(error);
                    return;
                }

                callback(data);
            })
        },

        update: function (model, callback, errorCallback) {
            errorCallback = errorCallback || function (err) {
                console.log(err);
            };

            this.getById(model._id).done(function (oldModel) {
                oldModel = model;

                console.log(model);

                oldModel.save(function (err, newModel) {

                    console.log(newModel);
                    if (err) {
                        return errorCallback(err)
                    }
                    callback(newModel);
                });
            })
        }
    };
};
