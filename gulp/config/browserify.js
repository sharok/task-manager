"use strict"

var assign = require('object-assign'),
    reactify = require('reactify'),
    browserifyShim = require('browserify-shim'),
    globify = require('require-globify'),
    pack = require('../../common/package');

var jsBundle = {
    entry: pack.get('paths:js') + 'app.js',
    name: 'script.js',
    transform: [reactify, browserifyShim],
    environment: 'DEVELOP',
    paths: [pack.get('paths:js')]
};

var jsBundleProduction = assign(jsBundle, {
    minify: true, 
    environment: 'PRODUCTION'
});

var libsBundle = {
    entry: pack.get('paths:js') + 'libs.js',
    name: 'libs.js',
    minify: true,
    environment: 'PRODUCTION'
};

var testBundle = {
    wait: true,
    entry: pack.get('paths:js') + 'test.js',
    name: 'client-test.js',
    transform: [reactify, globify],
    environment: 'TEST',
    dest: pack.get('paths:bin'),
    paths: [pack.get('paths:js')]
};

var config = {
    develop: jsBundle,
    production: jsBundleProduction,
    libs: libsBundle,
    test: testBundle
};

module.exports = config;