"use strict"

var assign = require('object-assign'),
    reactify = require('reactify'),
    browserifyShim = require('browserify-shim'),
    globify = require('require-globify'),
    pckJson = require('../../package.json'),
    shim = pckJson['browserify-shim'],
    external = [],
    rootJsDir = pckJson['dirs']['js'];

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

var testBundle = {
    wait: true,
    entry: rootJsDir + 'test.js',
    name: 'test.js',
    transform: [reactify, globify]
};

var browserifyConfig = {
    jsBundle: jsBundle,
    jsBundleProduction: assign({ minify: true }, jsBundle),
    libsBundle: libsBundle,
    testBundle: testBundle
};

module.exports = browserifyConfig;