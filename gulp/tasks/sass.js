var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

module.exports = function (params) {
    params = params || {
        minify: false
    };

    return function () {
        var task = gulp.src('./public/css/scss/*.scss')
            .pipe(sass())
            .on('error', function (err) {
                console.log(err.message);
            })
            .pipe(autoprefixer({
                browsers: ['Firefox > 20', 'Chrome > 20'],
                cascade: false
            }));

        if (params.minify) {
            task.pipe(minifyCSS());
        }

        task.pipe(gulp.dest('./public'));
    };
};