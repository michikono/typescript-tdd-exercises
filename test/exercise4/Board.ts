/// <reference path="../../references.ts" />

module GameOfLife {
    describe('GameOfLife', () => {
        var Screen: Terminal;
        before(() => {
            // it's very important we stub out external dependencies

        });
        describe('Board', () => {
            it('should exist', () => {
                assert.ok(new Board);
            });
        });
        describe('Game', () => {
            it('should exist', () => {
                assert.ok(new Game);
            });
        });
    });
} 
