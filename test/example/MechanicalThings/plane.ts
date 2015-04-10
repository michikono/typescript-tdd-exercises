/// <reference path="../../../references.ts" />
var assert = require("assert");

// Alternate testing method of modules -- explicitly typing out the entire namespace
describe('Example.MechanicalThings Module', function() {
    describe('move()', function() {
        it('should return the right sound effect', function() {
            var plane = new Example.MechanicalThings.PlaneImpl();
            assert.equal(plane.sound(), 'vroooooooom!');
        });
    });

    describe('position()', function() {
        it('should return an instance of Coordinate initialized to (0, 10) (because planes are in the sky!)', function() {
            var plane = new Example.MechanicalThings.PlaneImpl();
            assert.deepEqual({x: 0, y: 10}, plane.position());
        });
    });

    describe('move()', function() {
        it('should change the location of position() by a factor of 10 (because planes are fast!)', function() {
            var plane = new Example.MechanicalThings.PlaneImpl();
            plane.move({x: 2, y: 3});
            assert.deepEqual({x: 20, y: 40}, plane.position());
        });
        it('should change the location in an additive way', function() {
            var plane = new Example.MechanicalThings.PlaneImpl();
            plane.move({x: 2, y: 3});
            plane.move({x: 0, y: -4});
            assert.deepEqual({x: 20, y: 0}, plane.position());
        });
    });
});