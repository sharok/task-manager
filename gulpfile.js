var gulp = require('gulp'),
    gulpTasks = require('./gulp/main')([
        'browserify',
        'sass'
    ]);

gulp.task('browserify', gulpTasks.browserify());
gulp.task('browserify:min', gulpTasks.browserify({minify: true}));

gulp.task('sass', gulpTasks.sass());
gulp.task('sass:min', gulpTasks.sass({minify: true}));

gulp.task('watch', function () {
    gulp.watch('./public/css/scss/**/*.scss', ['sass']);
    gulp.watch('./public/js/**/*.js', ['browserify']);
    gulp.watch('./public/js/**/*.jsx', ['browserify']);
});


gulp.task('develop', ['browserify', 'sass', 'watch']);
gulp.task('production', ['browserify:min', 'sass:min']);

