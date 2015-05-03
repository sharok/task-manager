"use strict"

var pack = require('../../common/package');

var client = {
	entry: pack.get('paths:bin') + 'client-test.js'
};

var server = function (folder) {
	return {
		entry: ['./**/__test__/**/*.js', '!./client/**']
	};
};

var config = {
	client: client,
	server: server
};

module.exports = config;
