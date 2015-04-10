/// <reference path="../../references.ts" />

// REMOVE THESE LINES WHEN START THE EXERCISE
/* istanbul ignore next */

class Exercise1 {

    constructor(private word:string) {

    }

    public removeVowels():string {
        return this.word.replace(/aeiou/ig, '');
    }

    public removeNumbers():string {
        return 'incomplete method should remove 0-9';
    }

}