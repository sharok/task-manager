"use strict";

var invariant = function() {
    var args = Array.prototype.slice.apply(arguments),
        condition = args.shift(),
        format = args.shift();

    if (!condition) {
        var error;
        if (format === undefined) {
            error = new Error('some invariant');
        } else {
            var argIndex = 0;
            error = new Error(
                'Invariant Violation: ' +
                format.replace(/%s/g, function() { return args[argIndex++]; })
            );
        }

        error.framesToPop = 1;
        throw error;
    }
};

module.exports = invariant;