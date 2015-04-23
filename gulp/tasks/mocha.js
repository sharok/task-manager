"use strict"

var gulp = require('gulp'),
	mocha = require('gulp-mocha');

module.exports = function (config) {
	return function () {
		var task = gulp.src(config.entry, {read: false})
			.pipe(mocha());	
	};
};