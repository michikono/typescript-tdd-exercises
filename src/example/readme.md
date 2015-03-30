# Example

[This TypeScript example file](./index.ts) and its [companion test](../../test/example/index.ts) are meant to show you a few high level concepts
about how this project works.

In browsers, JavaScript shares the same scope across all files. The only way to make something private is to place it inside
a closure. However, in Node, you can [require](https://nodejs.org/api/modules.html) contents in from [exported modules](https://nodejs.org/api/modules.html#modules_module_exports).

For the sake of simplicity (and since the focus is TDD, not Node), *this project does not leverage Node's export functionality!*
Instead, we are compiling all TypeScript files into a single JavaScript file.

To accomplish namespaces, we will leverage [TypeScript modules](http://www.typescriptlang.org/Handbook#modules). You can see an example
of this in [index.ts](./index.ts).

    module MechanicalThings {

    // ..

    }

This converts into a closure when compiled to JavaScript. As you would expect, re-using this same module name in another file will
also share the scope between the two files. You can see this in the second file, [index2.ts](./index2.ts)