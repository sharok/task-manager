"use strict"

var invariant = require('invariant');

var mixins = {
    dynamicStyle: require('./dynamicStyle'),
    bindToStore: require('./bindToStore'),
    initialized: require('./initialized'),
    form: require('./form')
};

var main = function () {
    var keys = Array.prototype.slice.apply(arguments);

    return keys.map(function (key) {
        invariant(mixins[key], 'unknown mixin: `%s`', key);
        return mixins[key];
    });
};

module.exports = main;