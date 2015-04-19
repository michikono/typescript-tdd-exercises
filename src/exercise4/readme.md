# Writing a Real Program

In this exercise, we will write a traditional TDD exercise application: Conway's Game of Life. This game has a few simple
rules that simulate "life." 

To help you build this game, this exercise comes with a basic framework that handles some of the lower level display logic.
There is a `Terminal` class that you can use to print content to the screen. Use it like this:

    var terminal = Terminal.factory();
    terminal.loopCallback(myCallback);
    terminal.startLoop();
    
The `loopCallback` method is called every half second. It it, you will update the game state and update the `Terminal`
contents. The `loopCallback` signature looks like this:

    loopCallback: (() -> string) -> void

The return value is then displayed to the screen.

# Testing Tips

* Make sure you stub or mock the `Terminal` in your game tests. The `Terminal` represents an external dependency which
you never want to call in your tests.
* Write your tests WITH your code; ideally beforehand, but definitely don't wait until the end
* If it is difficult to test, re-think what you've written. 
[Inversion of control](http://stackoverflow.com/questions/3058/what-is-inversion-of-control) is usually a good place to
look.

# Rules of the Game

[Conway's Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a simple game with four rules:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Build this game. You can use spaces for empty cells and any other character for living ones (for example, this one: █). 
You may need to create more files and classes to do this well.

# Running your Game Outside of Tests

To run your game, initialize your game logic in [index.ts](./index.ts) and run:

    grunt run

You can press "q" to quit the game.