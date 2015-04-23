"use strict"

var assign = require('object-assign'),
    pack = require('../../common/package'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

module.exports = function (conf) {
    conf = assign({}, {
        entry: pack.get('paths:scss') + '*.scss',
        dest: pack.get('paths:public'),
        minify: false
    }, conf);

    return function () {
        var task = gulp.src(conf.entry)
            .pipe(sass())
            .on('error', function (err) {
                console.log(err.message);
            })
            .pipe(autoprefixer({
                browsers: ['Firefox > 20', 'Chrome > 20'],
                cascade: false
            }));

        if (conf.minify) {
            task.pipe(minifyCSS());
        }

        task.pipe(gulp.dest(conf.dest));
    };
};