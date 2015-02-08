mongoose = require('mongoose');

module.exports = function (schema) {
    return {
        schema: schema,
        model: new mongoose.Schema(schema)
    }
};