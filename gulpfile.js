var pckJson = require('./package.json'),
	rootJsDir = pckJson['dirs']['js'],
	gulp = require('gulp'),
    browserifyConfig = require('./gulp/config/browserify'),
    gulpTasks = require('./gulp/main')([
        'browserify',
        'sass',
        'mocha'
    ]);

gulp.task('js:bundle', gulpTasks.browserify(browserifyConfig.jsBundle));
gulp.task('js:production', gulpTasks.browserify(browserifyConfig.jsBundleProduction));
gulp.task('libs:bundle', gulpTasks.browserify(browserifyConfig.libsBundle));
gulp.task('tests:bundle', gulpTasks.browserify(browserifyConfig.testBundle));

gulp.task('sass', gulpTasks.sass());
gulp.task('sass:min', gulpTasks.sass({minify: true}));

gulp.task('watch', function () {
    gulp.watch('./public/css/scss/**/*.scss', ['sass']);
    gulp.watch(rootJsDir + '**/*.js', ['js:bundle']);
    gulp.watch(rootJsDir + '**/*.jsx', ['js:bundle']);
});

gulp.task('test', ['tests:bundle'], gulpTasks.mocha());
gulp.task('develop', ['libs:bundle', 'js:bundle', 'sass', 'watch']);
gulp.task('production', ['libs:bundle', 'js:production', 'sass:min']);
