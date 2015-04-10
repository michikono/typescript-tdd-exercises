/// <reference path="../../references.ts" />

module Calculator {
    export interface Expression {
        eval: () => number
    }

    export class NumberExpression implements Expression {
        constructor(private val:number) {

        }

        eval() {
            return this.val
        }
    }

    export class AddExpression implements Expression {
        constructor(private left:Expression, private right:Expression) {

        }

        eval() {
            return this.left.eval() + this.right.eval()
        }
    }

    // REMOVE THESE LINES WHEN START THE EXERCISE
    /* istanbul ignore next */
    export class ExpressionComparer {
        constructor(private left:Expression, private right:Expression) {

        }

        equals():Boolean {
            return this.left.eval() == this.right.eval()
        }

        greaterThan():Boolean {
            return this.left.eval() < this.right.eval()
        }
    }
}
