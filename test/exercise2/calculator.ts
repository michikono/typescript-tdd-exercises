/// <reference path="../../references.ts" />
var assert = require("assert");

module Calculator {
    describe('Exercise2', function () {
        describe('Calculator Module', function () {
            describe('NumberExpression', function () {
                it('should return the number provided in the constructor', function () {
                    var expression = new NumberExpression(5);
                    assert.ok(expression.eval() === 5);
                });
            });
            describe('AddExpression', function () {
                it('should return the sum of two Expressions provided in the constructor', function () {
                    var expression = new AddExpression(new NumberExpression(2), new NumberExpression(-5));
                    assert.ok(expression.eval() === -3)
                });
            });
            describe('ExpressionComparer', function () {
                describe('equals', function () {
                    it('should return true if the two expression evaluations are equal', function () {
                        var expression = new ExpressionComparer(new NumberExpression(35), new NumberExpression(35));
                        assert.ok(expression.equals());
                    });
                    it('should return false if the two expression evaluations are not equal', function () {
                    });
                });
                describe('greaterThan', function () {
                    it('should return true if the left expression is greater than the right', function () {
                    });
                    it('should return false if the left expression is equal to or less than the right', function () {
                    });
                });
            });
        });
    });
}