var assert = require('assert'),
	dynamicStyle = require('../dynamicStyle');

describe('Dynamic style mixin', function() {
	describe('#cs()', function() {
		it('should include only keys values of which are true', function() {
			var className = dynamicStyle.cs({
				'class1': true,
				'class2': false,
				'class3': true
			});

			assert.equal(className, 'class1 class3');
		});
	});
});