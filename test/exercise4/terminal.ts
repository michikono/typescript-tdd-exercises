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
            var terminal:Terminal;

            before(() => {
                blessed.program = sinon.stub();
                blessed.screen = sinon.stub();
                blessed.box = sinon.stub();

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

                screenMock = {
                    render: sinon.stub(),
                    append: sinon.stub(),
                    remove: sinon.stub(),
                    enableKeys: sinon.stub()
                };

                boxMock = {
                    content: ''
                };

                programStub = <SinonStub> blessed.program;
                programStub.returns(programMock);

                screenStub = <SinonStub> blessed.screen;
                screenStub.returns(screenMock);

                boxStub = <SinonStub> blessed.box;
                boxStub.returns(boxMock);
            });

            beforeEach(() => {
                processStub = sinon.stub(process, 'exit');

                (<SinonStub> blessed.program).reset();
                (<SinonStub> blessed.screen).reset();
                (<SinonStub> blessed.box).reset();

                (<SinonStub> programMock.key).reset();
                (<SinonStub> programMock.unkey).reset();
                (<SinonStub> programMock.clear).reset();
                (<SinonStub> programMock.enableMouse).reset();
                (<SinonStub> programMock.disableMouse).reset();
                (<SinonStub> programMock.showCursor).reset();
                (<SinonStub> programMock.hideCursor).reset();
                (<SinonStub> programMock.normalBuffer).reset();
                (<SinonStub> programMock.alternateBuffer).reset();
                (<SinonStub> programMock.exit).reset();

                (<SinonStub> screenMock.render).reset();
                (<SinonStub> screenMock.append).reset();
                (<SinonStub> screenMock.remove).reset();
                (<SinonStub> screenMock.enableKeys).reset();
            });

            afterEach(() => {
                programStub.reset();
                screenStub.reset();
                boxStub.reset();
                processStub.restore();
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
                    terminal = new Terminal(blessed);
                    assert.ok(initProgramStub.calledWithExactly(blessed));
                    assert.ok(initScreenStub.calledWithExactly(blessed));
                });
            });
            describe('instance', () => {
                it('should return an instance of Terminal', () => {
                    var spy = sinon.spy(GameOfLife, 'Terminal');
                    var instance = Terminal.instance();
                    spy.restore();
                    assert.ok(spy.calledWithNew(spy));
                });
                it('should pass blessed into the constructor call', () => {
                    var spy = sinon.spy(GameOfLife, 'Terminal');
                    var instance = Terminal.instance();
                    spy.restore();
                    assert.ok(spy.calledWithExactly(blessed));
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
                    terminal = new Terminal(blessed);
                    getQuitCallbackSpy.restore();
                    assert.ok((<SinonStub> programMock.key).calledWith('q'));
                    assert.ok((<SinonStub> programMock.clear).calledOnce);
                    assert.ok(getQuitCallbackSpy.calledOnce);
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
                    terminal = new Terminal(blessed);
                    assert.ok((<SinonStub> screenMock.append).calledOnce);
                    assert.ok((<SinonStub> screenMock.enableKeys).calledOnce);
                });
            });
            describe('setContent', () => {
                it('should set the internal content', () => {
                    terminal = new Terminal(blessed);
                    assert.notEqual("new content", terminal.getContent());
                    terminal.setContent("new content");
                    assert.equal("new content", terminal.getContent());
                });
            });
            describe('print', () => {
                it('should set be a wrapper for setContent', () => {
                    terminal = new Terminal(blessed);
                    var setContentStub = sinon.stub(terminal, 'setContent');
                    terminal.print("new content");
                    assert.ok(setContentStub.called);
                });
            });
            describe('exit', () => {
                it('should attempt to kill the process', () => {
                    var terminal = new Terminal(blessed);
                    terminal.exit();
                    assert.ok(processStub.calledWith(0));
                });
                it('should attempt to kill the process', () => {
                    var terminal = new Terminal(blessed);
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
