"use strict"

var pack = require('../../common/package');

var client = {
	entry: pack.get('paths:bin') + 'client-test.js'
};

var config = {
	client: client
};

module.exports = config;
