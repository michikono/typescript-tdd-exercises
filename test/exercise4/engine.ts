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

            describe('game', () => {
                var mockGame: IGame;
                beforeEach(() => {
                    mockGame = <IGame> {
                        cycle: sandbox.spy()
                    }
                });

                it('should not call cycle initially', () => {
                    engine = new Engine();
                    engine.game(mockGame);
                    engine.start();
                    assert.ok((<SinonSpy> mockGame.cycle).notCalled);
                });
                it('should call cycle once after the initial tick', () => {
                    engine = new Engine();
                    engine.game(mockGame);
                    engine.start();
                    clock.tick(engine.getRefreshRate() + 1);
                    assert.ok((<SinonSpy> mockGame.cycle).calledOnce);
                });
                it('should call cycle multiple times as time moves forward', () => {
                    engine = new Engine();
                    engine.game(mockGame);
                    engine.start();
                    clock.tick(engine.getRefreshRate() + 1);
                    clock.tick(engine.getRefreshRate() + 1);
                    assert.ok((<SinonSpy> mockGame.cycle).calledTwice);
                });
                it('should call cycle at a rate that is set by setRefreshRate', () => {
                    engine = new Engine();
                    engine.game(mockGame);
                    engine.setRefreshRate(1000);
                    engine.start();
                    clock.tick(1001);

                    clock.tick(1001);
                    assert.ok((<SinonSpy> mockGame.cycle).called);
                });
            });

            describe('start', () => {
                var mockGame: IGame;
                beforeEach(() => {
                    mockGame = <IGame> {
                        cycle: sandbox.spy()
                    }
                });

                it('should bind game.cycle to game and he pipe instance', () => {
                    var pipe = {
                        print: sandbox.spy()
                    };
                    engine = new Engine();
                    engine.game(mockGame);
                    engine.pipe(pipe);
                    var bindSpy = sandbox.spy(mockGame.cycle, 'bind');
                    engine.start();
                    assert.ok(bindSpy.calledWithExactly(mockGame, pipe));
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
