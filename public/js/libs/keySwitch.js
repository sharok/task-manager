"use strict"

var assign = require('object-assign'),
    invariant = require('invariant');

var keysCodes = {
    27: 'esc',
    37: 'leftArrow',
    39: 'rightArrow',
    38: 'upArrow',
    40: 'downArrow'
};

var keySwitch = function (keyCode, actions) {
    actions = assign({
        other: function () {

        }
    }, actions);

    var actionKey = keysCodes[keyCode],
    action = actions[actionKey];

    if (typeof action === 'undefined')
        actions.other();
    else
        action();
};

module.exports = keySwitch;