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
});