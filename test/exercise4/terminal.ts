/// <reference path="../../references.ts" />

module GameOfLife {
    describe('GameOfLife', () => {
        describe('Terminal', () => {
            var programMock:BlessedProgram;
            var screenMock:BlessedScreen;
            var boxMock:BlessedBox;
            var processStub:SinonStub;
            var terminal:Terminal;

            beforeEach(() => {
                blessed.program = sandbox.stub();
                blessed.screen = sandbox.stub();
                blessed.box = sandbox.stub();

                programMock = {
                    key: sandbox.stub(),
                    unkey: sandbox.stub(),
                    clear: sandbox.stub(),
                    enableMouse: sandbox.stub(),
                    disableMouse: sandbox.stub(),
                    showCursor: sandbox.stub(),
                    hideCursor: sandbox.stub(),
                    normalBuffer: sandbox.stub(),
                    alternateBuffer: sandbox.stub(),
                    exit: sandbox.stub()
                };

                screenMock = {
                    render: sandbox.stub(),
                    append: sandbox.stub(),
                    remove: sandbox.stub(),
                    enableKeys: sandbox.stub()
                };

                boxMock = {
                    content: ''
                };
                (<SinonStub> blessed.box).returns(boxMock);
                (<SinonStub> blessed.program).returns(programMock);
                (<SinonStub> blessed.screen).returns(screenMock);

                processStub = sandbox.stub(process, 'exit');
            });

            afterEach(() => {
                terminal = null;
            });

            describe('Constructor', () => {
                var initProgramStub:SinonStub;
                var initScreenStub:SinonStub;

                beforeEach(() => {
                    initProgramStub = sandbox.stub(Terminal.prototype, 'initProgram');
                    initScreenStub = sandbox.stub(Terminal.prototype, 'initScreen');
                });

                it('Should call initialization methods', () => {
                    terminal = new Terminal(blessed);
                    assert.ok(initProgramStub.calledWithExactly(blessed));
                    assert.ok(initScreenStub.calledWithExactly(blessed));
                });
            });
            describe('instance', () => {
                it('should return an instance of Terminal', () => {
                    var spy = sandbox.spy(GameOfLife, 'Terminal');
                    var instance = Terminal.instance();
                    assert.ok(spy.calledWithNew(spy));
                });
                it('should pass blessed into the constructor call', () => {
                    var spy = sandbox.spy(GameOfLife, 'Terminal');
                    var instance = Terminal.instance();
                    assert.ok(spy.calledWithExactly(blessed));
                });
            });
            describe('initProgram', () => {
                var initScreenStub:SinonStub;

                beforeEach(() => {
                    initScreenStub = sandbox.stub(Terminal.prototype, 'initScreen');
                });

                it('should attach a "q" event to getQuitCallback and call clear()', () => {
                    var getQuitCallbackSpy = sandbox.spy(Terminal.prototype, 'getQuitCallback');
                    terminal = new Terminal(blessed);
                    assert.ok((<SinonStub> programMock.key).calledWith('q'));
                    assert.ok((<SinonStub> programMock.clear).calledOnce);
                    assert.ok(getQuitCallbackSpy.calledOnce);
                });
            });
            describe('initScreen', () => {

                beforeEach(() => {
                    sandbox.stub(Terminal.prototype, 'initProgram');
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
                    var setContentStub = sandbox.stub(terminal, 'setContent');
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
                    var getQuitCallbackStub = sandbox.stub(terminal, 'getQuitCallback');
                    terminal.exit();
                    assert.ok((<SinonStub> programMock.unkey).calledWith('q'));
                    assert.ok(getQuitCallbackStub.calledOnce);
                });
            });
        });
    });
} 
