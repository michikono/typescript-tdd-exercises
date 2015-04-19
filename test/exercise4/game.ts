/// <reference path="../../references.ts" />

module GameOfLife {
    describe('GameOfLife', () => {
        // it's very important we stub out external dependencies
        var terminal: Terminal;

        beforeEach(() => {

        });

        describe('Game', () => {
            it('should exist', () => {
                assert.ok(new Game);
            });
        });
    });
} 
