var utils = require('../utils'),
    assert = require('assert');

describe('Utils Library', function() {
	describe('#liteEqual()', function() {
		it('should return true if corresponding fields of objects are equal', function() {
			var a = {
				id: 1,
				name: 'ablay',
				age: 20,
				city: 'astana'
			},
			b = {
				city: 'astana',
				age: 20
			};

			assert.ok(utils.liteEqual(a, b));
		});

		it('should return false if field of one object is not equal to corresponding field of another', function() {
			var a = {
				id: 1,
				name: 'ablay',
				age: 20,
				city: 'astana'
			},
			b = {
				name: 'balbes',
				city: 'astana',
				age: 20
			};
			
			assert.equal(utils.liteEqual(a, b), false);
		});
	});

	describe('#clone( object )', function() {
		it('should copy fields', function() {
			var a = {
				age: 20,
				name: 'name'
			},
			b = utils.clone(a);
			assert.deepEqual(b, a);
		});

		it('should not return reference', function() {
			var a = {
				age: 20,
				name: 'name'
			},
			b = utils.clone(a);
			b.age = 25;
			assert.equal(a.age, 20);
		});
	});

	describe('#clone( array )', function() {
		it('should return array', function() {
			var a = [],
			b = utils.clone(a);
			assert.ok(b instanceof Array);
		});

		it('should copy all items', function() {
			var a = [ { age: 20 }, { age: 21 }, { age: 25 } ],
			b = utils.clone(a);
			assert.deepEqual(a, b);
		});

		it('should copy all fields of each item', function() {
			var a = [ { age: 20 }, { age: 21 }, { age: 25 } ],
			b = utils.clone(a);
			assert.deepEqual(a[0], b[0]);
		});

		it('should not return reference', function() {
			var a = [ { age: 20 }, { age: 21 }, { age: 25 } ],
			b = utils.clone(a);
			b[0].age = 30;
			assert.equal(a[0].age, 20);
		});
	});
});