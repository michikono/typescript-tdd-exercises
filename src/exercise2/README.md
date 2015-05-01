# Spies, Mocks, & Stubs

## Objectives

1. Learn the difference between spies, mocks, and stubs
2. Write tests for code with dependencies

## Exercise A

In this exercise, you are given some code that already has partial coverage.

Edit [calculator.ts](./calculator.ts); remove the lines about `istanbul ignore` on **line 28 & 29** that look like this:

```typescript
/* istanbul ignore next */
```

By removing these lines, the class defined below it will begin to count against the code coverage reports. You should notice
your code coverage is no longer at 100%. Make sure your watcher is running (`grunt watch`)

1. Implement the remaining tests and fix any bugs you find in the process.
2. Add `NegateExpression` (`-n`) - inverts the provided `Expression`. For example, `NegateExpression(NumberExpression(-3))` 
would evaluate to 3.
3. Add `PowerExpression` (`2^n`) - takes the given `Expression` and sets it as the exponent of 2. For example, 
`PowerExpression(NumberExpression(3))` would evaluate to 8
4. Make sure your code coverage is constantly at 100%.

## Exercise B

In most of your previous tests, you probably used the `NumberExpression` class. This might make
sense because in this case, `NumberExpression` is very straight forward. The problem with this approach
is that if there is a bug in `NumberExpression`, all of your subsequent tests break.

Replace the contents of `NumberExpression`.`eval()` so it always returns a random number between 1 - 3:

```typescript
Math.ceil(Math.random() * 3)
```

Notice how most of your tests are now broken, and inconsistently at that! Fix all your tests so that each
passes regardless of what `Expression` implementation is passed into it. Try approaches varying
between mocks, stubs, and dummy implementations of `Expression`. When done, revert the "bug" introduced to 
`NumberExpression`.`eval()`.

## Exercise C

In this last example, we will examine using external dependencies. In this specific case, we will treat
JavaScript standard library `Math` as one: you can't modify it, didn't write it, but need its behavior.

Add the following new `Expression` type and write tests for it:

* `RandomExpression` (`random(n)`) - return a random integer between 0 and `Expression`, inclusively. For example, 
`RandomExpression(NumberExpression(3))` would evaluate to a random number 0 - 6

Note that this last `Expression` implementation's tests will absolutely require that you stub the `Math.random` method.