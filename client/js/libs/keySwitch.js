var assign = require('object-assign'),
    invariant = require('invariant');

var keysCodes = {
    27: 'esc',
    37: 'leftArrow',
    39: 'rightArrow',
    38: 'upArrow',
    40: 'downArrow',
    9: 'tab',
    13: 'enter'
};

var getKey = function (keyCode) {
    var key = keysCodes[keyCode];

    if (keyCode >= 48 && keyCode <= 57) {
        key = keyCode - 48;
    }

    if (keyCode >= 96 && keyCode <= 105) {
        key = keyCode - 96;
    }

    return key + ''; 
};

var keySwitch = function (keyCode, actions) {
    if (typeof actions === 'undefined') {
        return getKey(keyCode);
    };

    var callbacks = [],
        keyName = keysCodes[keyCode],
        action = actions[keyName];

    if (typeof action !== 'undefined') {
        callbacks.push(action);
    }

    if (typeof action === 'undefined' && typeof actions.other !== 'undefined') {
        callbacks.push(actions.other);
    }

    if (typeof actions.digits !== 'undefined' && 
        ( (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))
        ) {
        callbacks.push(actions.digits);
    }

    callbacks.forEach(function (callback) {
        callback(); 
    });
};

module.exports = keySwitch;