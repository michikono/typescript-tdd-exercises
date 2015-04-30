# Introduction to TDD & Unit Testing

## Objectives

1. Learn the tools
2. Write a test on existing code
3. Add tests

## Preparation

Edit [index.ts](./index.ts); uncomment the line about `istanbul ignore` that looks like this:

    /* istanbul ignore next */

By removing this line, the class defined below it will begin to count against the code coverage reports. You should notice
your code coverage is no longer at 100%. The next three exercises will help you get back to 100% coverage.

## Exercise A

Find and open the [/coverage/reports/lcov-report/index.html](../../coverage/reports/lcov-report/index.html) and navigate the file.

You can re-run tests individually by running:

    $ grunt test

This command will also refresh the coverage report. Note that the you can run these commands automatically via the `watch` command:

    $ grunt watch

If you've done this correctly, you should see output that resembles:

    $ grunt watch

    > Running "watch" task
    > Waiting...

## Exercise B

Add a test for the `removeVowels()` method. The test should go to [/test/exercise1/word.ts](../../test/exercise1/word.ts)

You should see the coverage report edge back up to 100%. The [exercise 1 coverage report][../../coverage/reports/lcov-report/exercise1/word.js.html] should
show the removeVowels method fully covered (green). You will notice `removeNumbers()` is still red.

## Exercise C

Add a test for the `removeNumbers()` method. The test should go to [/test/exercise1/word.ts](../../test/exercise1/word.ts)

Note that you want to write the test, *it will fail*. This is because we have not yet added the logic for `removeNumbers()`.

After you've written the test, update the `removeNumbers()` method so that it has the appropriate logic. Your test should pass.

You are done when all tests pass and coverage is 100%.
