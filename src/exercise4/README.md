# Writing a Real Program

## Objectives

1. Deal with external dependencies/frameworks 
2. Use lessons learned to write a larger program

## Summary

In this exercise, we will write a traditional TDD exercise application: Conway's Game of Life. This game has a few simple
rules that simulate "life." 

To help you build this game, this exercise comes with a basic framework that handles some of the lower level display logic.
There is a `Terminal` class that you can use to print content to the screen. It is used like this (you don't need to test 
this out):

```typescript
var terminal = Terminal.instance();
terminal.setContent("text to show")
```

You can press "q" to quit the program.

A skeleton game engine has also been written for you. Use it like this:

```typescript
var engine = new Engine();
engine.pipe(printer: IPrintable);
engine.game(game: IGame);
engine.start();
```
    
The `IGame` instance has a `cycle` method that is called every `engine.getRefreshRate()` milliseconds (default: 250). In 
that method, use the `IPrintable` argument's `print` method to push contents to the screen. 

# Testing Tips

* Make sure you stub or mock the `Terminal` in your game tests. The `Terminal` represents an external dependency which
you never want to call in your tests.
* Write your tests WITH your code; not necessarily beforehand, but definitely don't wait until the end
* If something is difficult to test, re-think what you've written. 
[Inversion of control](http://stackoverflow.com/questions/3058/what-is-inversion-of-control) is usually a good place to
start.
* Mocking/stubbing/spying-on instance methods called during a constructor is sometimes challenging, since it will impact
all subsequent instances unless you are careful. If you plan to do this, use this syntax (`sandbox` ensures your hooks get cleaned up):

```typescript
var mySpy = sandbox.spy(TheClassName.prototype, 'instanceMethod');
```


# Rules of the Game

[Conway's Game of Life](http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) is a simple game with four rules:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Build this game with a board size of your choosing. You can use spaces for empty cells and any other character for 
living ones (for example, this one: █). You may need to create more files and classes to do this elegantly. The 
`grunt watch` process will detect these new files without problem.

# Running your Game Outside of Tests

To run your game, initialize your game logic in [run.ts](./run.ts). There is already a example in that file. To run it:

```shell
$ npm run e4
```

You can press "q" to quit the program.

The current sample code in [`run.ts`](./run.ts) is using a simple object that matches the `IGame` interface. Because 
`run.ts` is not covered by tests, it is important that it is as small as possible. Try refactoring your version of
this code to use a more elegant design. For example, using a class to wrap the game logic better:

```typescript
var engine = new Engine();
engine.pipe(Terminal.instance());
engine.game(new MineSweeper());
engine.start();
```

or the [Facade Pattern](http://en.wikipedia.org/wiki/Facade_pattern) to hide this initialization logic: 

```typescript
new MineSweeperGame().start();
```
    
You may want to make these types of changes last after you have things working.
