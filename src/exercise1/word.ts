/// <reference path="../../references.ts" />

module Exercise1 {
    // REMOVE THESE LINES WHEN START THE EXERCISE
    /* istanbul ignore next */
    export class Word {
        constructor(private word:string) {

        }

        public removeVowels():string {
            return this.word.replace(/aeiou/ig, '');
        }

        public removeNumbers():string {
            return 'incomplete method should remove 0-9';
        }
    }
}