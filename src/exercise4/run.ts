/// <reference path="../../references.ts" />

// THIS FILE IS IGNORED BY TESTS
// Avoid placing logic here!
console.log('\n**** GAME INITIALIZING ****\n');

var terminal = GameOfLife.Terminal.instance();
terminal.loopCallback(function() {
    return 'My example output, the date:\n' +
        Date() +
        '\n\nPress q to quit';
});
terminal.startLoop();