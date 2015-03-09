"use strict"

var assign = require('object-assign'),
    reactify = require('reactify'),
    browserifyShim = require('browserify-shim'),
    pckJson = require('../../package.json'),
    shim = pckJson['browserify-shim'],
    external = [],
    rootJsDir = './public/js/';

Object.keys(shim).forEach(function (key) {
    var namespaces = shim[key].split('.');
    if (namespaces[0] !== 'global:libs') return;

    external.push(key);
});

var jsBundle = {
    entry: rootJsDir + 'app.js',
    name: 'script.js',
    external: external,
    transform: [reactify, browserifyShim]
};

var libsBundle = {
    entry: rootJsDir + 'libs.js',
    name: 'libs.js',
    minify: true
};

var browserifyConfig = {
    rootJsDir: rootJsDir,
    jsBundle: jsBundle,
    jsBundleProduction: assign({ minify: true }, jsBundle),
    libsBundle: libsBundle
};

module.exports = browserifyConfig;