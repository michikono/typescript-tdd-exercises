# Overview

This project contains a set of exercises to help teach TDD.

You can find instructions for individual exercises in the `src/` folder.

The setup process borrows the setup files found at the [Typescript Starter repo](https://github.com/michikono/typescript-starter)

Note that this requires that you install `npm` (`node` comes with it: http://nodejs.org/download/). This is because TypeScript
compiles to JavaScript and without Node, you would need to run your code in a browser. Running sample snippets in a browser
adds unnecessary complexity as compared to running Node scripts.

# Installing and running

First install all dependencies:

    npm install

Then you have two options: Use WebStorm or run it yourself.

## Setting up TypeScript watchers (compiles your code)

First, install new dependencies:

1. Install [Growl](http://growl.info/downloads#growlnotify)
2. Run `sudo gem install terminal-notifier`

This final step is the one that turns on the TDD process and is what you use going forward:

    `npm run watch`

For reference, these are the commands under the hood (but you shouldn't need to run them):

    npm run ts  # compiles typescript
    npm test    # runs tests

It should reload the tests on each change.

# Notes

* Testing is done using two libraries. One is Mocha, a framework for writing assertions. The other is Sinon, a
stubbing and mocking library.
* You can find the Mocha documentation here: [http://mochajs.org/](http://mochajs.org/#getting-started)
* You can find the Sinon documentation here: [http://sinonjs.org/docs/](http://sinonjs.org/docs/)
* TypeScript declarations are found in `tsd.d.ts`, but are managed using `tsd`. They are like `.h` files in other
languages. If you end up using external libraries such as Underscore.js, you may want to install the dependency
using `tsd install [name] --save` (more on this here: [https://github.com/DefinitelyTyped/tsd](https://github.com/DefinitelyTyped/tsd))