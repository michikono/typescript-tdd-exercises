/// <reference path="../../references.ts" />
var assert = require("assert");

module LegacyCode {
    describe('LegacyCode', function () {
        describe('MineSweeper', function () {
        });
        describe('printMineSweeperBoard', function () {
            it('should print a board that signifies legacy behavior is intact', function () {
                printMineSweeperBoard([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 1}], 10);
            });
        });
    });
}