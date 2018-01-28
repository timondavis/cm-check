"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("../../Check/D20AttributeCheck");
var CheckExecutor_1 = require("../../Check/CheckExecutor");
var chai_1 = require("chai");
require("mocha");
var TestCore_1 = require("../TestCore");
describe('D20AttributeCheck', function () {
    var c;
    var CE = CheckExecutor_1.CheckExecutor.getInstance();
    it('should roll with 1d20 by default', function () {
        var attributeValue = TestCore_1.TestCore.randomInt(25);
        var originalTarget = TestCore_1.TestCore.randomInt();
        c = new D20AttributeCheck_1.D20AttributeCheck(attributeValue, originalTarget, 'Strength');
        chai_1.expect(c.getDieBag().getDieWithSides(20)).to.have.length(1);
    });
    it('should create a result modifier based on attribute', function () {
        c = new D20AttributeCheck_1.D20AttributeCheck(TestCore_1.TestCore.randomInt(20), 10, 'Intelligence');
        var modifiers = c.getModifiers();
        chai_1.expect(modifiers).to.have.length(1);
        var modifierValue = modifiers[0].getValue();
        CE.execute(c);
        chai_1.expect(c.getResult()).to.be.equal(c.getRawRollResult() + Number(modifierValue));
    });
    it('should automatically convert attribute values into standard attribute modifiers according to D20 system', function () {
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 0, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(-3);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 10, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(0);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 19, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(3);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 20, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(3);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 21, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(3);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 22, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(4);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 30, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(6);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 43, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(11);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 45, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(11);
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 46, 'Int');
        chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(12);
    });
    it('should allow the attribute value of the check to be updated and translated to the core modifier value', function () {
        c = new D20AttributeCheck_1.D20AttributeCheck(10, 10);
        chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(0);
        c.setAttributeValue(13);
        chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(1);
    });
});
//# sourceMappingURL=D20AttributeCheck.js.map