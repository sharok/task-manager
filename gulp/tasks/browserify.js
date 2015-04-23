"use strict"

var pack = require('../../common/package'),
    gulp = require('gulp'),
    assign = require('object-assign'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    source = require("vinyl-source-stream"),
    replace = require('gulp-replace');

var defaultConfig = {
    wait: false,
    minify: false,
    entry: '',
    name: 'bundle.js',
    dest: pack.get('paths:public'),
    external: [],
    transform: [],
    paths: [],
    environment: 'NONE',
    callback: null
};

var trimCallback = function (callback) {
    return callback || function () {};
};

var createTask = function (config, done) {
    var b = browserify({
            entries: [config.entry],
            extensions: ['.jsx'],
            paths: ['./node_modules'].concat(config.paths)
        });
    
    config.external.forEach(function (ex) {
        b.external(ex);
    });

    config.transform.forEach(function (tr) {
        b.transform(tr);
    });

    var bs = b.bundle()
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(source(config.name));

    if (config.minify) {
        bs.pipe(streamify(uglify()));
    }

    bs
    .pipe(streamify(replace('__CLAVY_ENVIRONMENT__', "'" + config.environment + "'")))
    .pipe(gulp.dest(config.dest))
    .on('end', function () {
        if (done !== null) {
            done();
        }
        if (config.callback != null) {
            callback();
        }
    })
    .on('error', function (err) {
        if (done !== null) {
            done(err);
        }
        if (config.callback != null) {
            callback(err);
        }
    });
};

module.exports = function (config) {
    config = assign({}, defaultConfig, config);

    if (config.wait) {
        return function (done) {
            createTask(config, done);
        }
    } else {
        return function () {
            createTask(config, null);
        }
    }
};