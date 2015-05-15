# Introducing Breaking Changes

## Objectives

1. Learn strategies for testing legacy code
2. Learn how to refactor legacy code in a TDD way 

## Summary

In Exercise 2B, we touched on how test coverage helps you see regression issues. In this section, we will modify 
legacy code by introducing incremental tests.

Note that for this exercise, the legacy methods will NOT be counted toward test coverage, but all new code you write will.
This will closely resemble how you might add tests in a production code base that lacks tests.

The legacy code in question places mines onto an imaginary board. We have two issues with this code: add a new feature for
dynamic board size and to fix a bug with mine placement, but either change would require a major rewrite. We will tackle 
this rewrite by breaking the method into testable components.

# Exercise A

In this first exercise, we want to introduce a small structural change that lets us write our high-level tests.

Our first objective is to move the legacy function inside an object (class). This first set of changes is the most 
risky in that they are made with little to no test coverage. Subsequent changes become less risky as tests are added.

Examine [minesweeper.ts](./minesweeper.ts). 

Our first change is to separate the printing logic from the calculation logic without impacting dependencies. We will 
move the entire contents of `printMineSweeperBoard` to another method to accomplish this.

* Create a `MineSweeper` class inside the `LegacyCode` module.
* Create a new method called `toString` and move the current contents of `printMineSweeperBoard` into it
* Change the signature of `toString` to return a string that would otherwise be printed to console. 
* Change `printMineSweeperBoard` so that it prints the return value from `toString` as shown here:

```typescript
console.log(new MineSweeper().toString(guesses, mineCount));
```

The above steps move key pieces of logic out of the legacy function without disrupting legacy code. 

# Exercise B

Now we need to add as many tests as we can to the legacy logic while recognizing some things are difficult/impossible to test.

**There is a bug with how many mines are placed**; we will fix it later so don't worry about finding it if you don't 
encounter it. Had this been a real assignment, this may be when we would have caught the issue. For now, ignore all 
failing tests that fail inconsistently. When writing tests against mine placement, use a low number of mines being 
placed. We will fix this in exercise 3.

Let's add more tests so that refactoring is safer. Add tests to `toString` that:
 
* Checks that the string represents a 10x10 grid (`(10 chars + line break) * 10 rows`)
* Ensures at least `n` mines are placed (mines are either `?` or `*`) where `n` is the argument provided in the method.
You may want to use a small value for `n` for this test given the bug mentioned previously. DO NOT FIX THE BUG.
* Ensures a string containing only underscores, asterisks, line breaks, and question marks is returned

# Exercise C

Now that you have test coverage, we are nearly ready to refactor the core logic. Before we can fix anything, we 
need to isolate the code that is causing the problem. In order to do this, we need to break the `toString` 
into even smaller pieces. We will do two structural changes that will help with subsequent changes:

* Create a new interface called `Board` with two properties: `x: number`, `y: number`
* Refactor the class to expect a `size: Board`, `guesses`, and `mineCount` as constructor arguments. This will break 
previous tests. Fix those tests. You will also need to update `printMineSweeperBoard()` to provide the legacy default 
values to `toString` (i.e., the value of `x` and `y` need to be set to 10.

If you haven't encounter *the* bug yet -- great. Let's encounter it now. Try updating your previous test that tests the 
mine placement to attempt to place 99 mines in a 10x10 grid (all squares except 1 will be filled with a mine). The test 
should fail nearly every time.
 
Now we need to update the actual mine placement logic. We will simulate a situation where core logic is being changed:

* Inside the inner `for` loop, there is an `if` block that contains logic for determining if a mine should be placed. 
Extract *the if condition* into a method with the signature: `shouldPlaceMine: () => bool`.
* Add a `getMineLocations: () => Array<MineCoordinate>` method (that will be used in the next step) that predetermines 
which positions mines should be placed in. The method returns an array of positions that mines should be placed at and if 
it runs again, returns the same results.
* Fix the logic for `shouldPlaceMine`: right now it gives early squares a higher chance of getting a mine (this is the
bug) and possibly does not place enough mines. Use the results from `getMineLocations` to make sure all mines always get placed. DO NOT SPEND TOO MUCH TIME TRYING TO GET PERFECT DISTRIBUTION -- the important part is that all required mines are always placed.

The above illustrates an example of how one might start to refactor a block of procedural code. There's much more refactoring 
that could be done, which is left as optional exercises:

* Lower the number of mines being placed and update your tests for `printMineSweeperBoard`: stub `getMineLocations()` 
so that it returns a predetermined set of coordinates that you can write your tests against. The randomly broken tests should now always pass. Make sure to check if `getMineLocations` is getting called (via spies).
* Add a method for printing a mine: change the line with the ternary operator to call a method instead: 
`placeMine: (coordinate: MineCoordinate) => string` which will return either `*` or `?` based on if the location has been
guessed during the constructor.
* Extract the logic to check if a guess overlaps with a mine placement (the line that mentions `guesses[k].x == j`)
* Add a border to the entire board
* Extract a method to build a row (instead of an additional inner `for` loop)
