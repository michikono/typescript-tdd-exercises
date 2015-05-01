/// <reference path="../../references.ts" />

// THIS FILE IS IGNORED BY TESTS
// Avoid placing logic here!
console.log('\n**** GAME INITIALIZING ****\n');

module GameOfLife {
    var engine = new Engine();
    var game = {
        cycle: function(pipe) {
            pipe.print('My example output, the datetime:\n' +
                Date() +
                '\n\nPress q to quit');
        }
    };
    engine.pipe(Terminal.instance());
    engine.game(game);
    engine.start();
}