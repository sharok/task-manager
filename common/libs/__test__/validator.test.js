var validator = require('../validator'),
    assert = require('assert');

describe('Validator Library', function () {
    describe('#checkEmail()', function () {
        it("should return true for simple correct email address", function () {
            assert.ok(validator.checkEmail("niceandsimple100@example.com"));
        });

        it("should return true for correct email which contains special chars", function () {
            assert.ok(validator.checkEmail("#!$%&'*+-/=?^_`{}|~@example.org"));
        });

        it("should return true for correct email which contains unicode chars", function () {
            assert.ok(validator.checkEmail("???????@example.com"));
        });

        it("should return true for correct email which contains dots", function () {
            assert.ok(validator.checkEmail("a.little.lengthy.but.fine@dept.example.com"));
        });

        it("should return true for correct email which contains dashes", function () {
            assert.ok(validator.checkEmail("other.email-with-dash@example.com"));
        });

        it("should return false for incorrect email which contains nothing", function () {
            assert.equal(validator.checkEmail(""), false);
        });

        it("should return false for incorrect email which contains undefined", function () {
            assert.equal(validator.checkEmail(undefined), false);
        });

        it("should return false for incorrect email which doesn't contain @ char", function () {
            assert.equal(validator.checkEmail("Abc.example.com"), false);
        });
    });

    describe('#checkPasswords()', function () {
        it("should return true when password and confirm password are the same", function () {
            assert.ok(validator.checkPasswords("password", "password"));
        });

        it("should return false when password and confirm password are not the same", function () {
            assert.equal(validator.checkPasswords("password", "password1"), false);
        });

        it("should return false when password is filled but confirm password is empty", function () {
            assert.equal(validator.checkPasswords("password", ""), false);
        });
    })
});