/// <reference path="../../references.ts" />

// This file is ignored by tests
console.log('\n**** INITIALIZE THE GAME HERE ****\n');

//var terminal = GameOfLife.Terminal.factory();
var terminal = new GameOfLife.Terminal(GameOfLife.blessed);
var i =0;
terminal.loopCallback(function() {
    return '.' + i++;
});
terminal.startLoop();

