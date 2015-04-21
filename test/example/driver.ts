/// <reference path="../../references.ts" />

// When testing modules you can declare tests inside a module block
module Example {
    class MockTransportationImpl implements MechanicalThings.Transportation {
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
                it('(CUSTOM IMPL) should reset the transportation position to (0, 0)', () => {
                    var mockTransport = new MockTransportationImpl(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.park();
                    assert.deepEqual({x: 0, y: 0}, mockTransport.position());
                });

                // see more on this topic here:  http://sinonjs.org/docs/#mocks
                // mocks are good for testing dependency objects are used correctly (looking for specific method calls)
                it('(USING A MOCK) should reset the transportation position to (0, 0)', () => {
                    //var mockTransport = new MockTransportationImpl(2, 3);
                    var car = new MechanicalThings.CarImpl();
                    var driver = new Driver(car);

                    // register a mock
                    var mock = sandbox.mock(car);
                    mock.expects("position").once().returns({x: 0, y: 0});
                    mock.expects("move").withArgs({x: 0, y: 0}).once();

                    driver.park();

                    // verify that the expected behavior has executed
                    mock.verify();
                });

                // see more on this topic here: http://sinonjs.org/docs/#stubs
                // stubs are best for specifying control flow; they overwrite behavior on specific methods
                it('(USING A STUB) should reset the transportation position to (0, 0)', () => {
                    var mockTransport = new MechanicalThings.CarImpl();

                    // setup stubs to overwrite move method to force it to (0, 0)
                    var stub = sandbox.stub(mockTransport, 'move', function () {
                        this.x = 1;
                        this.y = 1;
                    });
                    var driver = new Driver(mockTransport);

                    driver.park();

                    // undo the stubs
                    stub.restore();

                    // should be parked at wherever we forced move to set the car
                    assert.deepEqual({x: 1, y: 1}, mockTransport.position());
                });

                // see more on this topic here: http://sinonjs.org/docs/#spies
                // spies are best for callbacks, but should be avoided in favor of mocks for objects
                // spies still execute the original methods!
                it('(USING SPIES) should reset the transportation position to (0, 0)', () => {
                    var car = new MechanicalThings.CarImpl();
                    var positionSpy = sandbox.spy(car, "position");
                    var moveSpy = sandbox.spy(car, "move");

                    var driver = new Driver(car);
                    driver.park();

                    assert.ok(positionSpy.calledOnce);
                    assert.ok(moveSpy.withArgs({x: 0, y: 0}).calledOnce);
                });
            });
            describe('goForward()', () => {
                it('should change the position by (0, 1 * velocity)', () => {
                    var mockTransport = new MockTransportationImpl(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.goForward();
                    assert.deepEqual({x: 2, y: 8}, mockTransport.position());
                });
            });
            describe('goBackwards()', () => {
                it('should change the position by (0, -1 * velocity)', () => {
                    var mockTransport = new MockTransportationImpl(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.goBackwards();
                    assert.deepEqual({x: 2, y: -2}, mockTransport.position());
                });
            });
            describe('turnLeft()', () => {
                it('should change the position by (-1 * velocity, 0)', () => {
                    var mockTransport = new MockTransportationImpl(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.turnLeft();
                    assert.deepEqual({x: -3, y: 3}, mockTransport.position());
                });
            });
            describe('turnRight()', () => {
                it('should change the position by (0, 1 * velocity)', () => {
                    var mockTransport = new MockTransportationImpl(2, 3);
                    var driver = new Driver(mockTransport);
                    driver.turnRight();
                    assert.deepEqual({x: 7, y: 3}, mockTransport.position());
                });
            });
        });
    });
}
