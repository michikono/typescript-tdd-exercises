/// <reference path="../../references.ts" />

module LegacyCode {
    describe('LegacyCode', () => {
        var sandbox:SinonSandbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        describe('MineSweeper', () => {
        });
        describe('printMineSweeperBoard', () => {
            var consoleStub:SinonStub;
            beforeEach(function() {
                consoleStub = sandbox.stub(console, 'log')
            });
            it('should print a board that signifies legacy behavior is intact', () => {
                printMineSweeperBoard([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}], 10);
                assert.ok(consoleStub.called);
            });
        });
    });
}