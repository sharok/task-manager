var gulp = require('gulp'),
    assign = require('object-assign'),
    browserify = require('browserify'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    source = require("vinyl-source-stream");

module.exports = function (params) {
    params = assign({
        minify: false,
        entry: '',
        name: 'script.js',
        dest: './public/',
        external: [],
        transform: []
    }, params);

    return function () {
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

        bs.pipe(gulp.dest('./public/'));
    };
};