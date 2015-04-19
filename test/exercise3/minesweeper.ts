/// <reference path="../../references.ts" />

module LegacyCode {
    describe('LegacyCode', () => {
        describe('MineSweeper', () => {
        });
        describe('printMineSweeperBoard', () => {
            var consoleStub:SinonStub;
            before(function() {
                consoleStub = sinon.stub(console, 'log')
            });
            after(function() {
                consoleStub.restore();
            });
            it('should print a board that signifies legacy behavior is intact', () => {
                printMineSweeperBoard([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}], 10);
                assert.ok(consoleStub.called);
            });
        });
    });
}