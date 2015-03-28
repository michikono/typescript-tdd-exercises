# Overview

This project contains a set of exercises to help teach TDD. It will auto-compile your TypeScript code, run your tests and, enforce a
minimum code coverage percentage (95%).

# Installing and running

First install all dependencies:

    npm install

## Setting up TypeScript watchers (compiles your code)

For these exercises, we will use [Grunt](http://gruntjs.com/) to manage the build process.

This final step is the one that turns on the TDD process and is what you use going forward:

    `npm run watch`

For reference, these are the commands under the hood (but you shouldn't need to run them):

    npm run ts  # compiles typescript
    npm test    # runs tests

It should reload the tests on each change. There are a few secondary dependencies you may need to install by hand:

1. Install [Growl](http://growl.info/downloads#growlnotify)
2. Run `sudo gem install terminal-notifier`

# Notes

## Structure

* As you make changes, all code is bundled into a single `.js` file at `out/test.js` and `out/coverage.js`. This is to avoid the complexity of
using Node's `require` syntax in a TypeScript environment (although entirely doable).
* You can find example src & test files at `src/example/*` and `test/example/*`.
* You can find instructions for individual exercises in the `src/` folder.
* All of your `.ts` files should start with a reference to the root level `references.ts` file. See examples.
* TypeScript declarations are found in `tsd.d.ts`, but are managed using `tsd`. They are like `.h` files in other
languages. If you end up using external libraries such as Underscore.js, you may want to install the dependency
using `tsd install [name] --save` (more on this here: [https://github.com/DefinitelyTyped/tsd](https://github.com/DefinitelyTyped/tsd))

## Resources

* This setup process borrows from the [Typescript Starter repo](https://github.com/michikono/typescript-starter)
* You need to install `npm` (`node` comes with it: http://nodejs.org/download/). This is because TypeScript
compiles to JavaScript and without Node, you would need to run your code in a browser. Running sample snippets in a browser
adds unnecessary complexity as compared to running Node scripts.
* Testing is done using two libraries. One is Mocha, a framework for writing assertions. The other is Sinon, a stubbing and mocking library.
* You can find the Mocha documentation here: [http://mochajs.org/](http://mochajs.org/#getting-started)
* You can find the Sinon documentation here: [http://sinonjs.org/docs/](http://sinonjs.org/docs/)
