"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("../../Check/D20AttributeCheck");
var CheckExecutor_1 = require("../../Check/CheckExecutor");
var chai_1 = require("chai");
require("mocha");
describe('Basic D20 Check', function () {
    var attributeValue = Math.floor(Math.random() * Math.floor(20)) + 1;
    var targetValue = Math.floor(Math.random() * Math.floor(10) + 10);
    var CE = CheckExecutor_1.CheckExecutor.getInstance();
    var check = new D20AttributeCheck_1.D20AttributeCheck(attributeValue, targetValue, 'Generic');
    CE.execute(check);
    it('should have a target value matching the one provided', function () {
        chai_1.expect(check.getTarget() == targetValue);
    });
    it('should have been applied default modifier correctly', function () {
        chai_1.expect(check.getRawRollResult() === check.getResult() - Number(check.getModifiers()[0].getValue()));
    });
    it('should have exactly 1 d20 in the die bag', function () {
        chai_1.expect(check.getDieBag().report()[20].length === 1);
    });
});
//# sourceMappingURL=D20AttributeCheck.js.map