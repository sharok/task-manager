var assign = require('object-assign');

var utils = {
	liteEqual: function (a, b) {
		var check = true;
			aFields = Object.keys(a),
			bFields = Object.keys(b),
			smallest = aFields.length > bFields.length ? bFields : aFields;

		smallest.forEach(function (field) {
			if (a[field] === b[field]) return;
			check = false;
		});

		return check;
	},

	clone: function (a) {
		if (a instanceof Array) {
			var b = [];
			a.forEach(function (i) {
				b.push(typeof i === 'object' ? utils.clone(i) : i);
			});
			return b;
		}
		return assign({}, a);
	}
};

module.exports = utils;