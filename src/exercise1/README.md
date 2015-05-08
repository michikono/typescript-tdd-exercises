# Introduction to TDD & Unit Testing

## Objectives

1. Learn the tools
2. Write a test on existing code
3. Add tests

## Exercise A

Find and open the [/coverage/reports/lcov-report/index.html](../../coverage/reports/lcov-report/index.html) and navigate
the file.

You can re-run tests individually by running:

```shell
$ grunt test
```

This command will also refresh the coverage report. Note that the you can run these commands automatically via the 
`watch` command:

```shell
$ grunt watch
>
> Running "watch" task
> Waiting...
```

This is the baseline you want for all of your tests going forward.

As you make any changes to TypeScript files, you should see this command trigger events automatically. For example, 
try adding a space to [/src/exercise1/word.ts](../../src/exercise1/word.ts) and save it. You will see the `watch` 
recompile the TypeScript and run all tests.

## Exercise B

Right now, we actually do not have 100% coverage; some test coverage analysis is being suppressed. Edit 
[word.ts](./word.ts); remove the line about `istanbul ignore` that looks like this:

```typescript
/* istanbul ignore next */
```

By removing this line, the class defined below it will begin to count against the code coverage reports. You should notice
your code coverage is no longer at 100%.

Add a test for the `removeVowels()` method. The test should go to [/test/exercise1/word.ts](../../test/exercise1/word.ts)

You should see the coverage report edge back up to 100%. The 
[exercise 1 coverage report](../../coverage/reports/lcov-report/exercise1/word.js.html) should show the removeVowels 
method fully covered (green). You will notice `removeNumbers()` is still red.

## Exercise C

Add a test for the `removeNumbers()` method. The test should go to [/test/exercise1/word.ts](../../test/exercise1/word.ts)

Note that you want to write the test, *that will fail*. This is because we have not yet added the logic for `removeNumbers()`.
*Make sure it fails first.*

After you've written the test, update the `removeNumbers()` method so that it has the appropriate logic. Your test 
should pass.

You are done when all tests pass and coverage is 100%.
