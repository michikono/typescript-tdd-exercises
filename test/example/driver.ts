/// <reference path="../../references.ts" />
var assert = require("assert");

// When testing modules you can declare tests inside a module block
module Example {
    class MockTransportation implements MechanicalThings.Transportation {
        constructor(private x, private y) {
        }

        sound() {
            return 'mock';
        }

        move(offset:Coordinate) {
            this.x = this.x + (offset.x * this.velocity());
            this.y = this.y + (offset.y * this.velocity());
        }

        velocity() {
            return 5;
        }

        position() {
            return {x: this.x, y: this.y};
        }
    }

    describe('Example Module', () => {
        describe('Driver', () => {
            describe('park()', () => {
                it('should reset the transportation position to (0, 0)', () => {
                    var mockTransport = new MockTransportation(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.park();
                    assert.deepEqual({x: 0, y: 0}, mockTransport.position());
                })
            });
            describe('goForward()', () => {
                it('should change the position by (0, 1 * velocity)', () => {
                    var mockTransport = new MockTransportation(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.goForward();
                    assert.deepEqual({x: 2, y: 8}, mockTransport.position());
                })
            });
            describe('goBackwards()', () => {
                it('should change the position by (0, -1 * velocity)', () => {
                    var mockTransport = new MockTransportation(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.goBackwards();
                    assert.deepEqual({x: 2, y: -2}, mockTransport.position());
                })
            });
            describe('turnLeft()', () => {
                it('should change the position by (-1 * velocity, 0)', () => {
                    var mockTransport = new MockTransportation(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.turnLeft();
                    assert.deepEqual({x: -3, y: 3}, mockTransport.position());
                })
            });
            describe('turnRight()', () => {
                it('should change the position by (0, 1 * velocity)', () => {
                    var mockTransport = new MockTransportation(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.turnRight();
                    assert.deepEqual({x: 7, y: 3}, mockTransport.position());
                })
            });
        });
    });
}
