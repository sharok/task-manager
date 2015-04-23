var keySwitch = require('../keySwitch'),
    assert = require('assert');

describe('Key Switch', function() {
    it('should execute `esc` callback', function(){
      	var a = 5;

    		keySwitch(27, {
      			'esc': function () {
      				a = 10;
      			},
      			'enter': function () {
      				a = 15;	
      			}
    		});

    		assert.equal(a, 10);	
    });

    it('should trigger `digits` callback if pressed key is digit', function () {
        var sum = 0;
            trigger = function (keyCode) {
                keySwitch(keyCode, {
                    'digits': function () {
                        sum++;
                    }
                });
            };

        trigger(49);
        trigger(53);
        trigger(56);

        assert.equal(sum, 3);
    });

    it('should trigger `digits` callback if pressed key is numpad* or digit', function () {
        var sum = 0;
            trigger = function (keyCode) {
                keySwitch(keyCode, {
                    'digits': function () {
                        sum++;
                    }
                });
            };

        trigger(49);
        trigger(96);
        trigger(56);
        trigger(104);

        assert.equal(sum, 4);
    });

    it('should execute `other` callback if callback of passing key is not defined', function() {
        var a = 5;

        keySwitch(27, {
            'enter': function () {
                a = 10;
            },
            'tab': function () {
                a = 20;
            },
            'other': function () {
                a = 0;
            }
        });

        assert.equal(a, 0);
    });

    it('should return name according key code', function () {
        assert.equal(keySwitch(27), 'esc');
    });

    it('should return digit according key code', function () {
        assert.equal(keySwitch(51), '3');
    });
    it('should return digit according key code (numpad*)', function () {
        assert.equal(keySwitch(51), '3');
    });
});