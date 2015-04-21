/// <reference path="../../references.ts" />

module GameOfLife {
    describe('GameOfLife', () => {
        // it's very important we stub out external dependencies
        var engine: Engine;
        var clock:SinonFakeTimers;
        var sandbox:SinonSandbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            clock = sandbox.useFakeTimers();
        });

        afterEach(() => {
            sandbox.restore();
        });

        describe('Engine', () => {
            it('should exist', () => {
                assert.ok(new Engine);
            });

            describe('pipe', () => {
                it('should return the pipe instance you pass in', () => {
                    var pipe = {
                        print: () => ''
                    };

                    var engine = new Engine();
                    assert.equal(pipe, engine.pipe(pipe))
                });
            });

            describe('print', () => {
                it('should return the pipe instance you pass in', () => {
                    var pipe = {
                        print: sandbox.spy()
                    };
                    var engine = new Engine();
                    engine.pipe(pipe);
                    engine.print('changes');
                    assert.ok(pipe.print.called);
                });
            });

            describe('cycle', () => {
                it('should not call cycle initially', () => {
                    engine = new Engine();
                    var callback = sandbox.stub().returns('');
                    engine.cycle(callback);
                    engine.start();
                    assert.ok(callback.notCalled);
                });
                it('should call cycle once after the initial tick', () => {
                    engine = new Engine();
                    var callback = sandbox.stub().returns('');
                    engine.cycle(callback);
                    engine.start();
                    clock.tick(engine.getRefreshRate() + 1);
                    assert.ok(callback.calledOnce);
                });
                it('should call cycle multiple times as time moves forward', () => {
                    engine = new Engine();
                    var callback = sandbox.stub().returns('');
                    engine.cycle(callback);
                    engine.start();
                    clock.tick(engine.getRefreshRate() + 1);
                    clock.tick(engine.getRefreshRate() + 1);
                    assert.ok(callback.calledTwice);
                });
                it('should call cycle at a rate that is set by setRefreshRate', () => {
                    engine = new Engine();
                    var callback = sandbox.stub().returns('');
                    engine.cycle(callback);
                    engine.setRefreshRate(1000);
                    engine.start();
                    clock.tick(1001);

                    clock.tick(1001);
                    assert.ok(callback.called);
                });
            });

            describe('start', () => {
                it('should not call callback initially', () => {
                    engine = new Engine();
                    var callbackSpy = sandbox.spy(engine, 'callback');
                    engine.start();
                    assert.ok(callbackSpy.notCalled);
                });
                it('should call callback once after the initial tick', () => {
                    engine = new Engine();
                    var callbackSpy = sandbox.spy(engine, 'callback');
                    engine.start();
                    clock.tick(engine.getRefreshRate() + 1);
                    assert.ok(callbackSpy.calledOnce);
                });
                it('should call callback multiple times as time moves forward', () => {
                    engine = new Engine();
                    var callbackSpy = sandbox.spy(engine, 'callback');
                    engine.start();
                    clock.tick(engine.getRefreshRate() + 1);
                    clock.tick(engine.getRefreshRate() + 1);
                    assert.ok(callbackSpy.calledTwice);
                });
                it('should call callback at a rate that is set by setRefreshRate', () => {
                    engine = new Engine();
                    var callbackSpy = sandbox.spy(engine, 'callback');
                    engine.setRefreshRate(1000);
                    engine.start();
                    clock.tick(1001);
                    clock.tick(1001);
                    assert.ok(callbackSpy.called);
                });
            });
            describe('stop', () => {
                it('should get rid of the interval ID', () => {
                    engine = new Engine();
                    engine.start();
                    engine.stop();
                    assert.ok(!engine.getIntervalId());
                });
            });

            describe('setRefreshRate', () => {
                it('should change the internal refresh rate (via getRefreshRate)', () => {
                    engine = new Engine();
                    var customRefreshRate = 600;
                    assert.notEqual(customRefreshRate, engine.getRefreshRate());
                    engine.setRefreshRate(customRefreshRate);
                    assert.equal(customRefreshRate, engine.getRefreshRate());
                });
            });
        });
    });
} 
