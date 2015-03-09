"use strict"

var globalLibs = require('../../package.json')['browserify-shim'],
    map = {
        'react': require('react/addons'),
        'dispatcher': require('./libs/dispatcher'),
        'keys': require('./libs/keys'),
        'linked-list': require('./libs/linkedList'),
        'page': require('page'),
        'object-assign': require('object-assign'),
        'component-ajax': require('component-ajax'),
        'es6-promise': require('es6-promise'),
        'events': require('events')
    },
    libs = {};

Object.keys(globalLibs).forEach(function (libKey) {
    var nameSpaces = globalLibs[libKey].split('.');
    if (nameSpaces[0] !== 'global:libs') return;
    libs[nameSpaces[1]] = map[libKey];
});

window.libs = libs;