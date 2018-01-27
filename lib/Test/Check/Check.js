"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var Check_1 = require("../../Check/Check");
var ResultModifier_1 = require("../../Check/Modifier/ResultModifier");
var TestCore_1 = require("../TestCore");
describe('Check', function () {
    var c;
    var MyCheck = /** @class */ (function (_super) {
        __extends(MyCheck, _super);
        function MyCheck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyCheck.prototype.getType = function () { return 'MyCheck'; };
        MyCheck.prototype.setBaseDieBag = function () { };
        return MyCheck;
    }(Check_1.Check));
    it('should not be directly instantiable', function () {
        chai_1.expect(function () { return new Check_1.Check(); }).to.throw();
    });
    it('should allow for modifers to be added', function () {
        var sides = TestCore_1.TestCore.randomInt();
        var dieValue = TestCore_1.TestCore.randomInt(sides);
        var modValue = TestCore_1.TestCore.randomInt();
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        c.getDieBag().add(TestCore_1.TestCore.randomInt(), sides, dieValue);
        c.addModifier(new ResultModifier_1.ResultModifier('result-boost', modValue));
        var modifiers = c.getModifiers();
        chai_1.expect(modifiers[0].getName()).to.be.equal('result-boost');
        chai_1.expect(modifiers[0].getValue()).to.be.equal(modValue);
    });
    it('should report pass/fail accurately', function () {
        var target = TestCore_1.TestCore.randomInt();
        c = new MyCheck(target);
        c.setResult(target - 1);
        chai_1.expect(c.isPass()).to.be.false;
        c.setResult(target);
        chai_1.expect(c.isPass()).to.be.true;
        c.setResult(target + 1);
        chai_1.expect(c.isPass()).to.be.true;
    });
    it('should retain its original roll value, even after its official result has been modified', function () {
        var target = TestCore_1.TestCore.randomInt();
        var sides = TestCore_1.TestCore.randomInt();
        var count = TestCore_1.TestCore.randomInt();
        var boostResultValueBy = TestCore_1.TestCore.randomInt();
        c = new MyCheck(target);
        c.getDieBag().add(sides, count);
        c.check();
        var originalResult = c.getDieBag().getTotal();
        c.setResult(c.getResult() + boostResultValueBy);
        chai_1.expect(c.getRawRollResult()).to.be.equal(originalResult);
    });
    it('should do a new roll with each check execution, and should change value within 5 rolls with 5d20', function () {
        c = new MyCheck(10);
        c.getDieBag().add(5, 20);
        c.check();
        var firstResult = c.getResult();
        for (var loopCounter = 0; loopCounter < 5; loopCounter++) {
            c.check();
            if (firstResult != c.getResult()) {
                break;
            }
        }
        chai_1.expect(c.getResult()).to.not.be.equal(firstResult);
    });
    it('should deliver accurate status reporting', function () {
        var total = 0;
        var count = TestCore_1.TestCore.randomInt();
        var target = TestCore_1.TestCore.randomInt();
        var modifierValue = TestCore_1.TestCore.randomInt();
        var dieDefinitions = TestCore_1.TestCore.generateDieDefinitions();
        var report;
        c = new MyCheck(target);
        TestCore_1.TestCore.addDieToBagWithDefinitions(dieDefinitions, c.getDieBag());
        c.addModifier(new ResultModifier_1.ResultModifier('M1', modifierValue));
        c.check();
        report = c.report(false);
        for (var definitionIndex = 0; definitionIndex < dieDefinitions.length; definitionIndex++) {
            chai_1.expect(report.dieBag.dieMap[String(dieDefinitions[definitionIndex][1])])
                .to.have.lengthOf(dieDefinitions[definitionIndex][0]);
        }
        chai_1.expect(report.isPass).to.be.true;
        chai_1.expect(report.target).to.be.equal(target);
        chai_1.expect(report.modifiers).has.length(1);
        chai_1.expect(report.modifiers[0].getName()).to.be.equal('M1');
        chai_1.expect(report.modifiers[0].getValue()).to.be.equal(modifierValue);
        chai_1.expect(report.result).to.be.equal(TestCore_1.TestCore.countTotalValuesOfDieInBag(c.getDieBag()));
    });
});
//# sourceMappingURL=Check.js.map