/// <reference path="../typings/tsd.d.ts" />
import assert = require("assert");
require('sinomocha')();

describe('Example Test Module', function () {
    describe('Example sub-module', function () {
        beforeEach(function () {
            // do something
        });

        describe('example()', function () {
            it('should return "Hello World!"', function () {
                assert.equal('Hello World!', 'Hello' + ' ' + 'World!');
            });
            it('should be true', function () {
                assert.ok(true);
            });
        });
    });
});
