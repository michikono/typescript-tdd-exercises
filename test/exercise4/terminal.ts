/// <reference path="../../references.ts" />

module GameOfLife {
    describe('GameOfLife', () => {
        describe('Terminal', () => {
            var programStub:SinonStub;
            var programMock:BlessedProgram;
            var screenStub:SinonStub;
            var screenMock:BlessedScreen;
            var boxStub:SinonStub;
            var boxMock:BlessedBox;
            var processStub:SinonStub;
            var blessedMock:any;
            var terminal:Terminal;
            var clock:SinonFakeTimers;

            before(() => {
                programMock = {
                    key: sinon.stub(),
                    unkey: sinon.stub(),
                    clear: sinon.stub(),
                    enableMouse: sinon.stub(),
                    disableMouse: sinon.stub(),
                    showCursor: sinon.stub(),
                    hideCursor: sinon.stub(),
                    normalBuffer: sinon.stub(),
                    alternateBuffer: sinon.stub(),
                    exit: sinon.stub()
                };

                programStub = sinon.stub(blessed, 'program').returns(programMock);

                screenMock = {
                    render: sinon.stub(),
                    append: sinon.stub(),
                    remove: sinon.stub(),
                    enableKeys: sinon.stub()
                };
                screenStub = sinon.stub(blessed, 'screen').returns(screenMock);

                boxMock = {
                    content: ''
                };

                boxStub = sinon.stub(blessed, 'box').returns(boxMock);
                blessedMock = {
                    program: () => programMock,
                    screen: () => screenMock,
                    box: () => boxMock
                }
            });

            beforeEach(() => {
                clock = sinon.useFakeTimers();
                processStub = sinon.stub(process, 'exit');
            });

            afterEach(() => {
                clock.restore();
                programStub.reset();
                screenStub.reset();
                boxStub.reset();
                processStub.restore();
            });

            after(() => {
                programStub.restore();
                screenStub.restore();
                boxStub.restore();
            });


            beforeEach(() => {
                terminal = null;
            });

            describe('Constructor', () => {
                var initProgramStub:SinonStub;
                var initScreenStub:SinonStub;

                before(() => {
                    initProgramStub = sinon.stub(Terminal.prototype, 'initProgram');
                    initScreenStub = sinon.stub(Terminal.prototype, 'initScreen');
                });

                afterEach(() => {
                    initProgramStub.reset();
                    initScreenStub.reset();
                });

                after(() => {
                    initProgramStub.restore();
                    initScreenStub.restore();
                });

                it('Should call initialization methods', () => {
                    terminal = new Terminal(blessedMock);
                    assert.ok(initProgramStub.calledWithExactly(blessedMock));
                    assert.ok(initScreenStub.calledWithExactly(blessedMock));
                });
            });
            describe('initProgram', () => {
                var initScreenStub:SinonStub;

                before(() => {
                    initScreenStub = sinon.stub(Terminal.prototype, 'initScreen');
                });

                afterEach(() => {
                    initScreenStub.reset();
                });

                after(() => {
                    initScreenStub.restore();
                });

                it('should attach a "q" event to getQuitCallback and call clear()', () => {
                    var getQuitCallbackSpy = sinon.spy(Terminal.prototype, 'getQuitCallback');
                    terminal = new Terminal(blessedMock);
                    assert.ok((<SinonStub> programMock.key).calledWith('q'));
                    assert.ok((<SinonStub> programMock.clear).calledOnce);
                    assert.ok(getQuitCallbackSpy.calledOnce);
                    getQuitCallbackSpy.restore();
                });
            });
            describe('initScreen', () => {
                var initProgramStub:SinonStub;

                before(() => {
                    initProgramStub = sinon.stub(Terminal.prototype, 'initProgram');
                });

                afterEach(() => {
                    initProgramStub.reset();
                    (<SinonStub> screenMock.append).reset();
                    (<SinonStub> screenMock.enableKeys).reset();
                });
                after(() => {
                    initProgramStub.restore();
                });

                // this is the main behavior that is crucial to showing content 
                it('should append a box object to the screen', () => {
                    terminal = new Terminal(blessedMock);
                    assert.ok((<SinonStub> screenMock.append).calledOnce);
                    assert.ok((<SinonStub> screenMock.enableKeys).calledOnce);
                });
            });
            describe('setRefreshRate', () => {
                it('should change the internal refresh rate (via getRefreshRate)', () => {
                    terminal = new Terminal(blessedMock);
                    var customRefreshRate = 600;
                    assert.notEqual(customRefreshRate, terminal.getRefreshRate());
                    terminal.setRefreshRate(customRefreshRate);
                    assert.equal(customRefreshRate, terminal.getRefreshRate());
                });
            });
            describe('startLoop', () => {
                it('should not call refreshMethod initially', () => {
                    terminal = new Terminal(blessedMock);
                    var refreshMethodSpy = sinon.spy(terminal, 'refreshMethod');
                    terminal.startLoop();
                    assert.ok(refreshMethodSpy.notCalled);
                });
                it('should call refreshMethod once after the initial tick', () => {
                    terminal = new Terminal(blessedMock);
                    var refreshMethodSpy = sinon.spy(terminal, 'refreshMethod');
                    terminal.startLoop();
                    clock.tick(terminal.getRefreshRate() + 1);
                    assert.ok(refreshMethodSpy.calledOnce);
                });
                it('should call refreshMethod multiple times as time moves forward', () => {
                    terminal = new Terminal(blessedMock);
                    var refreshMethodSpy = sinon.spy(terminal, 'refreshMethod');
                    terminal.startLoop();
                    clock.tick(terminal.getRefreshRate() + 1);
                    clock.tick(terminal.getRefreshRate() + 1);
                    assert.ok(refreshMethodSpy.calledTwice);
                });
                it('should call refreshMethod at a rate that is set by setRefreshRate', () => {
                    terminal = new Terminal(blessedMock);
                    var refreshMethodSpy = sinon.spy(terminal, 'refreshMethod');
                    terminal.setRefreshRate(1000);
                    terminal.startLoop();
                    clock.tick(1001);
                    clock.tick(1001);
                    assert.ok(refreshMethodSpy.called);
                });
            });

            describe('loopCallback', () => {
                it('should not call loopCallback initially', () => {
                    terminal = new Terminal(blessedMock);
                    var callback = sinon.stub().returns('');
                    terminal.loopCallback(callback);
                    terminal.startLoop();
                    assert.ok(callback.notCalled);
                });
                it('should call loopCallback once after the initial tick', () => {
                    terminal = new Terminal(blessedMock);
                    var callback = sinon.stub().returns('');
                    terminal.loopCallback(callback);
                    terminal.startLoop();
                    clock.tick(terminal.getRefreshRate() + 1);
                    assert.ok(callback.calledOnce);
                });

                it('should pass callback return value to setContent', () => {
                    terminal = new Terminal(blessedMock);
                    var callback = sinon.stub().returns('test string');
                    terminal.loopCallback(callback);
                    var stub = sinon.stub(terminal, 'setContent');
                    terminal.startLoop();
                    clock.tick(terminal.getRefreshRate() + 1);
                    assert.ok(stub.calledWithExactly('test string'));
                });
                it('should call loopCallback multiple times as time moves forward', () => {
                    terminal = new Terminal(blessedMock);
                    var callback = sinon.stub().returns('');
                    terminal.loopCallback(callback);
                    terminal.startLoop();
                    clock.tick(terminal.getRefreshRate() + 1);
                    clock.tick(terminal.getRefreshRate() + 1);
                    assert.ok(callback.calledTwice);
                });
                it('should call loopCallback at a rate that is set by setRefreshRate', () => {
                    terminal = new Terminal(blessedMock);
                    var callback = sinon.stub().returns('');
                    terminal.loopCallback(callback);
                    terminal.setRefreshRate(1000);
                    terminal.startLoop();
                    clock.tick(1001);

                    clock.tick(1001);
                    assert.ok(callback.called);
                });

            });
            describe('stopLoop', () => {
                it('should get rid of the interval ID', () => {
                    terminal = new Terminal(blessedMock);
                    terminal.startLoop();
                    terminal.stopLoop();
                    assert.ok(!terminal.getIntervalId());
                });
            });
            describe('setContent', () => {
                it('should set the internal content', () => {
                    terminal = new Terminal(blessedMock);
                    assert.notEqual("new content", terminal.getContent());
                    terminal.setContent("new content");
                    assert.equal("new content", terminal.getContent());
                });
            });
            describe('exit', () => {
                it('should attempt to kill the process', () => {
                    var terminal = new Terminal(blessedMock);
                    terminal.exit();
                    assert.ok(processStub.calledWith(0));
                });
                it('should attempt stop the loop', () => {
                    var terminal = new Terminal(blessedMock);
                    var stopLoopStub = sinon.stub(terminal, 'stopLoop');
                    terminal.exit();
                    assert.ok(stopLoopStub.called);
                });
                it('should attempt to kill the process', () => {
                    var terminal = new Terminal(blessedMock);
                    var getQuitCallbackStub = sinon.stub(terminal, 'getQuitCallback');
                    terminal.exit();
                    assert.ok((<SinonStub> programMock.unkey).calledWith('q'));
                    assert.ok(getQuitCallbackStub.calledOnce);
                    getQuitCallbackStub.restore();
                });
            });
        });
    });
} 
