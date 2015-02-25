var gulp = require('gulp'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    source = require("vinyl-source-stream");

module.exports = function (params) {
    params = params || {
        minify: false
    };

    return function () {
        var task = browserify({
            entries: ['./public/js/app.js'],
            extensions: ['.jsx'],
            paths: ['./node_modules','./public/js']
        })
            .bundle()
            .on('error', function (err) {
                console.log(err.message);
            })
            .pipe(source('script.js'));

        if (params.minify) {
            task.pipe(streamify(uglify()));
        }

        task.pipe(gulp.dest('./public/'));
    };
};