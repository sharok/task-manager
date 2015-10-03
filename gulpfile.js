"use strict"

var argv,
	pack = require('./common/package'),
	gulp = require('gulp'),
    requireTree = require('require-tree'),
    tasks = requireTree('./gulp/tasks'),
    config = requireTree('./gulp/config');

argv = require('yargs')
		.default('folder', '')
		.argv;



gulp.task('js:bundle', tasks.browserify( config.browserify.develop ));
gulp.task('js:production', tasks.browserify( config.browserify.production ));
gulp.task('libs:bundle', tasks.browserify( config.browserify.libs  ));
gulp.task('tests:bundle', tasks.browserify( config.browserify.test ));

gulp.task('sass', tasks.sass());
gulp.task('sass:min', tasks.sass({ minify: true }));

gulp.task('watch', function () {
    gulp.watch(pack.get('paths:scss') + '**/*.scss', ['sass']);
    gulp.watch(pack.get('paths:js') + '**/*.js', ['js:bundle']);
    gulp.watch(pack.get('paths:js') + '**/*.jsx', ['js:bundle']);
});

gulp.task('test:client', ['tests:bundle'], tasks.mocha( config.mocha.client ));
gulp.task('test:server', tasks.mocha( config.mocha.server(argv.folder) ));

gulp.task('test', ['test:client', 'test:server']);
gulp.task('develop', ['libs:bundle', 'js:bundle', 'sass', 'watch']);
gulp.task('production', ['libs:bundle', 'js:production', 'sass:min']);
