var gulp = require('gulp'),
    assign = require('object-assign'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    source = require("vinyl-source-stream"),
    replace = require('gulp-replace');

var defaultOptions = {
    wait: false,
    minify: false,
    entry: '',
    name: 'script.js',
    dest: './public/',
    external: [],
    transform: [],
    environment: 'NONE'
};

var trimCallback = function (callback) {
    return callback || function () {};
};

var createTask = function (params, callback) {
    callback = trimCallback(callback);
    var b = browserify({
            entries: [params.entry],
            extensions: ['.jsx'],
            paths: ['./node_modules','./public/js']
        });

    params.external.forEach(function (id) {
        b.external(id);
    });

    params.transform.forEach(function (tr) {
        b.transform(tr);
    });

    var bs = b.bundle()
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(source(params.name));

    if (params.minify) {
        bs.pipe(streamify(uglify()));
    }

    bs
    .pipe(streamify(replace('__CLAVY_ENVIRONMENT__', "'" + params.environment + "'")))
    .pipe(gulp.dest('./public/'))
    .on('end', function () {
        callback();
    })
    .on('error', function (err) {
        callback(err);
    });
};

module.exports = function (params) {
    params = assign({}, defaultOptions, params);

    if (params.wait) {
        return function (done) {
            createTask(params, done);
        }
    } else {
        return function () {
            createTask(params);
        }
    }
};