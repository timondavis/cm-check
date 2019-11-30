define(["require", "exports", "../../Check/D20AttributeCheck", "../../Check/CheckExecutor", "chai", "../TestCore", "mocha"], function (require, exports, D20AttributeCheck_1, CheckExecutor_1, chai_1, TestCore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            c = new D20AttributeCheck_1.D20AttributeCheck(10, 1, 'Int');
            chai_1.expect(Number(c.getModifiers()[0].getValue())).to.be.equal(-5);
        });
        it('should allow the attribute value of the check to be updated and translated to the core modifier value', function () {
            c = new D20AttributeCheck_1.D20AttributeCheck(10, 10);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(0);
            c.setAttributeValue(1);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(-5);
            c.setAttributeValue(2);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(-4);
            c.setAttributeValue(9);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(-1);
            c.setAttributeValue(10);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(0);
            c.setAttributeValue(11);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(0);
            c.setAttributeValue(12);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(1);
            c.setAttributeValue(13);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(1);
            c.setAttributeValue(14);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(2);
            c.setAttributeValue(23);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(6);
            c.setAttributeValue(24);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(7);
            c.setAttributeValue(25);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(7);
            c.setAttributeValue(26);
            chai_1.expect(c.getModifiers()[0].getValue()).to.be.equal(8);
        });
    });
});
