/// <reference path="../../references.ts" />

module GameOfLife {
    describe('GameOfLife', () => {
        describe('Terminal', () => {
            var programStub:SinonStub;
            var programMock:BlessedProgram;
            var programClearStub:SinonStub;
            var screenStub:SinonStub;
            var screenMock:BlessedScreen;
            var boxStub:SinonStub;
            var boxMock:BlessedBox;
            var processStub:SinonStub;
            var blessedMock:any;
            var terminal:Terminal;
            var clock:SinonFakeTimers;

            before(() => {
                programMock = blessed.program();
                programClearStub = sinon.stub(programMock, 'clear');
                programStub = sinon.stub(blessed, 'program').returns(programMock);

                screenMock = blessed.screen();
                screenStub = sinon.stub(blessed, 'screen').returns(screenMock);

                boxMock = blessed.box();
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
                programClearStub.reset();
                programStub.reset();
                screenStub.reset();
                boxStub.reset();
                processStub.restore();
            });

            after(() => {
                programClearStub.restore();
                programStub.restore();
                screenStub.restore();
                boxStub.restore();
            });


            beforeEach(() => {
                terminal = null;
            });

            afterEach(() => {
                programMock.showCursor();
                programMock.normalBuffer();
            });

            describe('Constructor', () => {
                var initProgramStub:SinonStub;
                var initScreenStub:SinonStub;
                var setRefreshRateStub:SinonStub;

                before(() => {
                    initProgramStub = sinon.stub(Terminal.prototype, 'initProgram');
                    initScreenStub = sinon.stub(Terminal.prototype, 'initScreen');
                    setRefreshRateStub = sinon.stub(Terminal.prototype, 'setRefreshRate');
                });

                afterEach(() => {
                    initProgramStub.reset();
                    initScreenStub.reset();
                    setRefreshRateStub.reset();
                });

                after(() => {
                    initProgramStub.restore();
                    initScreenStub.restore();
                    setRefreshRateStub.restore();
                });

                it('Should call initialization methods', () => {
                    var defaultRefreshRate = 500;
                    terminal = new Terminal(blessedMock);
                    assert.ok(initProgramStub.calledOnce);
                    assert.ok(initScreenStub.calledOnce);
                });
            });
            describe('initProgram', () => {
                var initScreenStub:SinonStub;
                var setRefreshRateStub:SinonStub;
                var programKeySpy:SinonSpy;

                before(() => {
                    initScreenStub = sinon.stub(Terminal.prototype, 'initScreen');
                    setRefreshRateStub = sinon.stub(Terminal.prototype, 'setRefreshRate');
                    programKeySpy = sinon.stub(programMock, 'key');
                });

                afterEach(() => {
                    initScreenStub.reset();
                    setRefreshRateStub.reset();
                    programKeySpy.reset();
                });

                after(() => {
                    initScreenStub.restore();
                    setRefreshRateStub.restore();
                    programKeySpy.restore();
                });

                it('should attach a "q" event to quitCallback and call clear()', () => {
                    terminal = new Terminal(blessedMock);
                    assert.ok(programKeySpy.calledWithExactly('q', Terminal.prototype['quitCallback']));
                    assert.ok(programClearStub.calledOnce);
                });
            });
            describe('initScreen', () => {
                var initProgramStub:SinonStub;
                var setRefreshRateStub:SinonStub;
                var appendSpy:SinonSpy;
                var enableKeysSpy:SinonSpy;

                before(() => {
                    initProgramStub = sinon.stub(Terminal.prototype, 'initProgram');
                    setRefreshRateStub = sinon.stub(Terminal.prototype, 'setRefreshRate');
                    appendSpy = sinon.spy(screenMock, 'append');
                    enableKeysSpy = sinon.spy(screenMock, 'enableKeys');
                });

                afterEach(() => {
                    initProgramStub.reset();
                    setRefreshRateStub.reset();
                    appendSpy.reset();
                    enableKeysSpy.reset();
                });
                after(() => {
                    initProgramStub.restore();
                    setRefreshRateStub.restore();
                    appendSpy.restore();
                    enableKeysSpy.restore();
                });


                // this is the main behavior that is crucial to showing content 
                it('should append a box object to the screen', () => {
                    terminal = new Terminal(blessedMock);
                    assert.ok(appendSpy.calledOnce);
                    assert.ok(enableKeysSpy.calledOnce);
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
                    var screen = new Terminal(blessedMock);
                    screen.exit();
                    assert.ok(processStub.calledWith(0));
                });
                it('should attempt stop the loop', () => {
                    var screen = new Terminal(blessedMock);
                    var stopLoopStub = sinon.stub(screen, 'stopLoop');
                    screen.exit();
                    assert.ok(stopLoopStub.called);
                });
            });
        });
    });
} 
