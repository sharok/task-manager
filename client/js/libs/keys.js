"use strict"

var keys = function(obj) {
    var ret = {};
    var key;
    if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('invalid argument');
    }
    for (key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }
        ret[key] = key;
    }
    return ret;
};

module.exports = keys;