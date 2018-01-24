"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("../Check/D20AttributeCheck");
var CheckExecutor_1 = require("../Check/CheckExecutor");
var chai_1 = require("chai");
require("mocha");
describe('Basic D20 Check', function () {
    var attributeValue = Math.floor(Math.random() * Math.floor(20)) + 1;
    var targetValue = Math.floor(Math.random() * Math.floor(10) + 10);
    var CE = CheckExecutor_1.CheckExecutor.getInstance();
    var check = new D20AttributeCheck_1.D20AttributeCheck(attributeValue, targetValue, 'Generic');
    CE.execute(check);
    // Target value remains true
    chai_1.expect(check.getTarget() == targetValue);
    // Make sure the modifier was applied correctly
    chai_1.expect(check.getRawRollResult() === check.getResult() - Number(check.getModifiers()[0].getValue()));
    // Make sure a d20 got rolled
    chai_1.expect(check.getDieBag().report()[20].length === 1);
});
//# sourceMappingURL=hello.js.map