var pckJson = require('../../package.json'),
	publicDir = pckJson['dirs']['public'],
	gulp = require('gulp'),
	mocha = require('gulp-mocha');

module.exports = function (config) {
	return function () {
		var task = gulp.src(publicDir + 'test.js', {read: false})
			.pipe(mocha());	
	};
};