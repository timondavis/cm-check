"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
var DieModifier_1 = require("../../Check/Modifier/DieModifier");
var TargetModifier_1 = require("../../Check/Modifier/TargetModifier");
describe('Check', function () {
    var c;
    var MyCheck = /** @class */ (function (_super) {
        __extends(MyCheck, _super);
        function MyCheck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyCheck.prototype.getType = function () { return 'MyCheck'; };
        MyCheck.prototype.setCheckDie = function () { };
        return MyCheck;
    }(Check_1.Check));
    it('should allow for modifiers to be added', function () {
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
        c.roll();
        var originalResult = c.getDieBag().getTotal();
        c.setResult(c.getResult() + boostResultValueBy);
        chai_1.expect(c.getRawRollResult()).to.be.equal(originalResult);
    });
    it('should do a new roll with each check execution, and should change value within 5 rolls with 5d20', function () {
        c = new MyCheck(10);
        c.getDieBag().add(5, 20);
        c.roll();
        var firstResult = c.getResult();
        for (var loopCounter = 0; loopCounter < 5; loopCounter++) {
            c.roll();
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
        c.roll();
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
    it('should allow >, <, >=, and <= as test conditions', function () {
        var test1BigNumber = TestCore_1.TestCore.randomInt() + 100;
        var test1SmallNumber = TestCore_1.TestCore.randomInt(test1BigNumber - 1);
        var test2BigNumber = TestCore_1.TestCore.randomInt() + 100;
        var test2SmallNumber = TestCore_1.TestCore.randomInt(test2BigNumber - 1);
        var test3BigNumber = TestCore_1.TestCore.randomInt() + 100;
        var test3SmallNumber = TestCore_1.TestCore.randomInt(test3BigNumber - 1);
        var test4BigNumber = TestCore_1.TestCore.randomInt() + 100;
        var test4SmallNumber = TestCore_1.TestCore.randomInt(test4BigNumber - 1);
        // Test 1 : >
        c = new MyCheck(test1BigNumber);
        c.setTestCondition('>');
        c.setResult(test1SmallNumber);
        chai_1.expect(c.isPass()).to.be.false;
        c.setTarget(test1SmallNumber);
        c.setResult(test1BigNumber);
        chai_1.expect(c.isPass()).to.be.true;
        // Test 2 : >=
        c = new MyCheck(test2BigNumber);
        c.setTestCondition('>=');
        c.setResult(test2SmallNumber);
        chai_1.expect(c.isPass()).to.be.false;
        c.setResult(test2BigNumber);
        chai_1.expect(c.isPass()).to.be.true;
        c.setTarget(test2SmallNumber);
        c.setResult(test2BigNumber);
        chai_1.expect(c.isPass()).to.be.true;
        // Test 3 : <
        c = new MyCheck(test3BigNumber);
        c.setTestCondition('<');
        c.setResult(test3SmallNumber);
        chai_1.expect(c.isPass()).to.be.true;
        c.setTarget(test3SmallNumber);
        c.setResult(test3BigNumber);
        chai_1.expect(c.isPass()).to.be.false;
        // Test 4 : <=
        c = new MyCheck(test4BigNumber);
        c.setTestCondition('<=');
        c.setResult(test4SmallNumber);
        chai_1.expect(c.isPass()).to.be.true;
        c.setResult(test4BigNumber);
        chai_1.expect(c.isPass()).to.be.true;
        c.setTarget(test4SmallNumber);
        c.setResult(test4BigNumber);
        chai_1.expect(c.isPass()).to.be.false;
    });
    it('should default to the >= test condition', function () {
        var bigNumber = TestCore_1.TestCore.randomInt() + 100;
        var smallNumber = TestCore_1.TestCore.randomInt(bigNumber);
        c = new MyCheck(smallNumber);
        c.setResult(bigNumber);
        chai_1.expect(c.isPass()).to.be.true;
        c.setResult(smallNumber);
        chai_1.expect(c.isPass()).to.be.true;
        c.setResult(smallNumber - 1);
        chai_1.expect(c.isPass()).to.be.false;
    });
    it('should not accept any test conditions beyond the accepted >, <, >=, and <=', function () {
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        chai_1.expect(function () { return c.setTestCondition('hello'); }).to.throw;
        chai_1.expect(function () { return c.setTestCondition('<<'); }).to.throw;
        chai_1.expect(function () { return c.setTestCondition('<!'); }).to.throw;
    });
    it('should create a 0-target default instance when no target number is provided in the constructor', function () {
        c = new MyCheck();
        chai_1.expect(c.getTarget()).to.be.equal(0);
    });
    it('should allow for adding and removing die from the check\'s die bag on the fly', function () {
        var bigNumber = TestCore_1.TestCore.randomInt() + 1;
        var smallNumber = TestCore_1.TestCore.randomInt(bigNumber) - 1;
        var sides = TestCore_1.TestCore.randomInt();
        c = new MyCheck();
        c.addDie(bigNumber, sides);
        c.removeDie(smallNumber, sides);
        chai_1.expect(c.getDieBag().getDieWithSides(sides)).to.have.length(bigNumber - smallNumber);
    });
    it('can be serialized and deserialized', function () {
        var _loop_1 = function (cycle) {
            var sidesCount = new Map();
            var targetNumber = TestCore_1.TestCore.randomInt(10000);
            var testCondition = '>';
            var check = new Check_1.Check();
            check.setTarget(targetNumber);
            check.setTestCondition(testCondition);
            for (var i = 0; i < TestCore_1.TestCore.randomInt(10) + 10; i++) {
                var sides = TestCore_1.TestCore.randomInt(100);
                var count = TestCore_1.TestCore.randomInt(100);
                if (sidesCount.has(sides)) {
                    sidesCount.set(sides, sidesCount.get(sides) + count);
                }
                else {
                    sidesCount.set(sides, count);
                }
                check.addDie(sides, count);
            }
            var dieModifiers = [];
            for (var i = 0; i < TestCore_1.TestCore.randomInt(3); i++) {
                var m = new DieModifier_1.DieModifier();
                m.setPhase('dm');
                m.setName('dm-' + i.toString());
                m.setValue(TestCore_1.TestCore.randomInt(10));
                check.addModifier(m);
            }
            var resultModifiers = [];
            for (var i = 0; i < TestCore_1.TestCore.randomInt(3); i++) {
                var m = new ResultModifier_1.ResultModifier;
                m.setPhase('rm');
                m.setName('rm-' + i.toString());
                m.setValue(TestCore_1.TestCore.randomInt(10));
                check.addModifier(m);
            }
            var targetModifiers = [];
            for (var i = 0; i < TestCore_1.TestCore.randomInt(3); i++) {
                var m = new TargetModifier_1.TargetModifier();
                m.setPhase('tm');
                m.setName('tm-' + i.toString());
                m.setValue(TestCore_1.TestCore.randomInt(10));
                check.addModifier(m);
            }
            var serializedCheck = Check_1.Check.serialize(check);
            var unserializedCheck = Check_1.Check.deserialize(serializedCheck);
            var usDieBag = unserializedCheck.getDieBag();
            var usTargetNumber = unserializedCheck.getTarget();
            var usTestCondition = unserializedCheck.getTestCondition();
            var usModifiers = unserializedCheck.getModifiers();
            Object.keys(usDieBag).forEach(function (sides) {
                chai_1.expect(sidesCount.get(Number.parseInt(sides))).to.be.equal(usDieBag[sides].length);
                sidesCount.delete(Number.parseInt(sides));
            });
            chai_1.expect(usTargetNumber).to.be.equal(targetNumber);
            chai_1.expect(usTestCondition).to.be.equal(testCondition);
            usModifiers.forEach(function (modifier) {
                switch (modifier.getType()) {
                    case ('die'): {
                        var i = dieModifiers.find(function (p) { return p.getName() == modifier.getName(); });
                        chai_1.expect(i.getName()).to.be.equal('dm-' + 1);
                        chai_1.expect(i.getValue()).to.be.equal(dieModifiers[i]);
                        chai_1.expect(i.getPhase()).to.be.equal('dm');
                        break;
                    }
                    case ('target'): {
                        var i = targetModifiers.find(function (p) { return p.getName() == modifier.getName(); });
                        chai_1.expect(i.getName()).to.be.equal('tm-' + 1);
                        chai_1.expect(i.getValue()).to.be.equal(dieModifiers[i]);
                        chai_1.expect(i.getPhase()).to.be.equal('tm');
                        break;
                    }
                    case ('result'): {
                        var i = resultModifiers.find(function (p) { return p.getName() == modifier.getName(); });
                        chai_1.expect(i.getName()).to.be.equal('km-' + 1);
                        chai_1.expect(i.getValue()).to.be.equal(dieModifiers[i]);
                        chai_1.expect(i.getPhase()).to.be.equal('rm');
                        break;
                    }
                    default:
                        throw "invalid status";
                        break;
                }
            });
        };
        for (var cycle = 0; cycle < 500; cycle++) {
            _loop_1(cycle);
        }
    });
});
//# sourceMappingURL=Check.js.map