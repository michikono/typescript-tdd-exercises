/// <reference path="../../../references.ts" />
var assert = require("assert");
var sinon:SinonStatic = require("sinon");

// Alternate testing method of modules -- explicitly typing out the entire namespace
describe('Example.MechanicalThings Module', () => {
    describe('move()', () => {
        it('should return the right sound effect', () => {
            var plane = new Example.MechanicalThings.PlaneImpl();
            assert.equal(plane.sound(), 'vroooooooom!');
        });
    });

    describe('position()', () => {
        it('should return an instance of Coordinate initialized to (0, 10) (because planes are in the sky!)', () => {
            var plane = new Example.MechanicalThings.PlaneImpl();
            assert.deepEqual({x: 0, y: 10}, plane.position());
        });
    });

    describe('move()', () => {
        it('should change the location of position() by a factor of 10 (because planes are fast!)', () => {
            var plane = new Example.MechanicalThings.PlaneImpl();
            plane.move({x: 2, y: 3});
            assert.deepEqual({x: 20, y: 40}, plane.position());
        });
        it('should change the location in an additive way', () => {
            var plane = new Example.MechanicalThings.PlaneImpl();
            plane.move({x: 2, y: 3});
            plane.move({x: 0, y: -4});
            assert.deepEqual({x: 20, y: 0}, plane.position());
        });
    });
});