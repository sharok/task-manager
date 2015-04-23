var nconf = require('nconf');

nconf.argv()
	.env()
	.file({ file: './package.json' });

module.exports = {
	get: function (field) {
		return nconf.get(field);
	}
};