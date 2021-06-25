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
var CheckExecutor_1 = require("../../Check/CheckExecutor");
var Check_1 = require("../../Check/Check");
var TestCore_1 = require("../TestCore");
var ResultModifier_1 = require("../../Check/Modifier/ResultModifier");
var Modifier_1 = require("../../Check/Modifier/Modifier");
describe('CheckExecutor', function () {
    var CE = CheckExecutor_1.CheckExecutor.getInstance();
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
    var MyResultModifier = /** @class */ (function (_super) {
        __extends(MyResultModifier, _super);
        function MyResultModifier(name, value) {
            var _this = _super.call(this, name, value) || this;
            _this.setPhase('after');
            return _this;
        }
        MyResultModifier.prototype.getType = function () { return 'MyResultModifier'; };
        MyResultModifier.prototype.applyTo = function (check) { check.setResult(check.getResult() + Number(this.getValue())); };
        return MyResultModifier;
    }(Modifier_1.Modifier));
    var MyTargetModifier = /** @class */ (function (_super) {
        __extends(MyTargetModifier, _super);
        function MyTargetModifier(name, value) {
            var _this = _super.call(this, name, value) || this;
            _this.setPhase('before');
            return _this;
        }
        MyTargetModifier.prototype.getType = function () { return 'MyTargetModifier'; };
        MyTargetModifier.prototype.applyTo = function (check) { check.setTarget(check.getTarget() + Number(this.getValue())); };
        return MyTargetModifier;
    }(Modifier_1.Modifier));
    it('should apply registered modifiers in the before and after roll phases correctly', function () {
        var originalTarget = TestCore_1.TestCore.randomInt();
        var resultModifierCount;
        var resultModifierValue;
        var totalResultModifierValue = 0;
        var targetModifierCount;
        var targetModifierValue;
        var totalTargetModifierValue = 0;
        c = new MyCheck(originalTarget);
        for (resultModifierCount = 0; resultModifierCount < TestCore_1.TestCore.randomInt(100); resultModifierCount++) {
            resultModifierValue = TestCore_1.TestCore.randomInt();
            c.addModifier(new MyResultModifier('RM' + String(resultModifierCount), resultModifierValue));
            totalResultModifierValue += resultModifierValue;
        }
        for (targetModifierCount = 0; targetModifierCount < TestCore_1.TestCore.randomInt(100); targetModifierCount++) {
            targetModifierValue = TestCore_1.TestCore.randomInt();
            c.addModifier(new MyTargetModifier('M' + String(targetModifierCount), targetModifierValue));
            totalTargetModifierValue += targetModifierValue;
        }
        CE.execute(c);
        chai_1.expect(c.getTarget()).to.be.equal(originalTarget + totalTargetModifierValue);
        chai_1.expect(c.getResult()).to.be.equal(c.getRawRollResult() + totalResultModifierValue);
    });
    it('should process 3rd party _modifiers hooks before the modifiers and the roll are applied in the before' +
        ' phase', function () {
        var originalTarget = TestCore_1.TestCore.randomInt();
        c = new MyCheck(originalTarget);
        c.addModifier(new MyTargetModifier('1', TestCore_1.TestCore.randomInt()));
        c.addModifier(new MyTargetModifier('2', TestCore_1.TestCore.randomInt() * -1));
        c.addModifier(new MyTargetModifier('3', TestCore_1.TestCore.randomInt()));
        CE.on(c.getType() + '_modifiers', function (check, phase) {
            if (phase !== 'before') {
                return;
            }
            var m = check.getModifiers();
            m.pop();
            m.pop();
            m.pop();
        });
        CE.execute(c);
        chai_1.expect(c.getTarget()).to.be.equal(originalTarget);
        c.addModifier(new MyTargetModifier('1', TestCore_1.TestCore.randomInt()));
        c.addModifier(new MyTargetModifier('2', TestCore_1.TestCore.randomInt() * -1));
        c.addModifier(new MyTargetModifier('3', TestCore_1.TestCore.randomInt()));
        CE.execute(c);
        chai_1.expect(c.getTarget()).to.be.equal(originalTarget);
        CE.removeAllListeners(c.getType() + '_modifiers');
    });
    it('should process 3rd party _roll hooks after the modifiers have been applied, but before the roll', function () {
        var originalTarget = TestCore_1.TestCore.randomInt();
        var targetBoost = TestCore_1.TestCore.randomInt();
        var newTarget = TestCore_1.TestCore.randomInt();
        var randomResult = TestCore_1.TestCore.randomInt();
        c = new MyCheck(originalTarget);
        c.addModifier(new MyTargetModifier('boost', targetBoost));
        CE.on(c.getType() + '_roll', function (check, phase) {
            if (phase !== 'before') {
                return;
            }
            check.setTarget(newTarget);
            check.setResult(randomResult);
        });
        CE.execute(c);
        chai_1.expect(c.getResult()).to.be.equal(0);
        chai_1.expect(c.getTarget()).to.be.equal(newTarget);
        CE.execute(c);
        chai_1.expect(c.getResult()).to.be.equal(0);
        chai_1.expect(c.getTarget()).to.be.equal(newTarget);
        CE.removeAllListeners(c.getType() + '_roll');
    });
    it('should process 3rd party _modifiers hooks before modifiers are applied but after the roll in the after' +
        ' phase', function () {
        var originalTarget = TestCore_1.TestCore.randomInt();
        c = new MyCheck(originalTarget);
        c.getDieBag().add(TestCore_1.TestCore.randomInt(), TestCore_1.TestCore.randomInt());
        c.addModifier(new MyResultModifier('1', TestCore_1.TestCore.randomInt()));
        c.addModifier(new MyResultModifier('2', TestCore_1.TestCore.randomInt()));
        c.addModifier(new MyResultModifier('3', TestCore_1.TestCore.randomInt()));
        CE.on(c.getType() + '_modifiers', function (check, phase) {
            var m = check.getModifiers();
            m.pop();
            m.pop();
            m.pop();
        });
        CE.execute(c);
        chai_1.expect(c.getResult()).to.be.equal(c.getRawRollResult());
        CE.removeAllListeners(c.getType() + '_modifiers');
    });
    it('should process 3rd party _finish hooks after die have been rolled and modifiers applied', function () {
        var originalTarget = TestCore_1.TestCore.randomInt();
        var sides = TestCore_1.TestCore.randomInt();
        var count = TestCore_1.TestCore.randomInt();
        var modifier1 = new MyResultModifier('1', TestCore_1.TestCore.randomInt());
        var modifier2 = new MyResultModifier('2', TestCore_1.TestCore.randomInt());
        var modifier3 = new MyResultModifier('3', TestCore_1.TestCore.randomInt());
        var lastModifier = TestCore_1.TestCore.randomInt();
        var totalModification = Number(modifier1.getValue()) +
            Number(modifier2.getValue()) +
            Number(modifier3.getValue()) +
            lastModifier;
        c = new MyCheck(originalTarget);
        c.getDieBag().add(count, sides);
        c.addModifier(modifier1);
        c.addModifier(modifier2);
        c.addModifier(modifier3);
        CE.on(c.getType() + '_finish', function (check, phase) {
            if (phase != 'after') {
                return;
            }
            check.setResult(check.getResult() + lastModifier);
        });
        CE.execute(c);
        chai_1.expect(c.getResult()).to.be.equal(c.getRawRollResult() + totalModification);
        CE.removeAllListeners(c.getType() + '_finish');
    });
    it('should facilitate registration and generation of any registered check type', function () {
        CE.registerCheckType('my', function () { return new MyCheck(); });
        c = CE.generateCheck('my');
        c.getDieBag().add(TestCore_1.TestCore.randomInt(), TestCore_1.TestCore.randomInt());
        CE.execute(c);
        chai_1.expect(c.getResult()).to.not.be.equal(0);
    });
    it('should accept and list registered check types', function () {
        CE.registerCheckType('MyCheck', function () { return new MyCheck(); });
        chai_1.expect(CE.getCheckTypes().indexOf('MyCheck')).to.not.be.equal(-1);
        c = CE.generateCheck('MyCheck');
        c.addDie(TestCore_1.TestCore.randomInt(), TestCore_1.TestCore.randomInt());
        c.setTarget(10);
        chai_1.expect(c.getType()).to.be.equal('MyCheck');
        CE.execute(c);
        chai_1.expect(c.getResult()).not.to.be.equal(0);
    });
    it('should facilitate registration and generation of any registered modifier type', function () {
        var modifierBoost = TestCore_1.TestCore.randomInt();
        CE.registerModifierType('MyTargetModifier', function () { return new MyTargetModifier('test', 0); });
        c = CE.generateCheck().addDie(TestCore_1.TestCore.randomInt(), TestCore_1.TestCore.randomInt());
        c.addModifier(CE.generateModifier('MyTargetModifier').setValue(modifierBoost));
        CE.execute(c);
        chai_1.expect(c.getTarget()).to.be.equal(modifierBoost);
    });
    it('should accept and list registered modifier types', function () {
        var modifierBoost = TestCore_1.TestCore.randomInt();
        CE.registerModifierType('my', function () { return new ResultModifier_1.ResultModifier('name', TestCore_1.TestCore.randomInt()); });
        chai_1.expect(CE.getModifierTypes().indexOf('my')).to.not.be.equal(-1);
        c = CE.generateCheck();
        c.addModifier(CE.generateModifier('my').setValue(modifierBoost));
        CE.execute(c);
        chai_1.expect(c.getResult()).to.be.equal(modifierBoost);
    });
    it('should provide default check types for immediate use', function () {
        chai_1.expect(CE.generateCheck().getType()).to.be.equal('simple');
        chai_1.expect(CE.generateCheck('d20-attribute').getType()).to.be.equal('d20-attribute');
    });
    it('should provide default modifier types for immediate use', function () {
        chai_1.expect(CE.generateModifier('result').getType()).to.be.equal('result');
        chai_1.expect(CE.generateModifier('target').getType()).to.be.equal('target');
        chai_1.expect(CE.generateModifier('die').getType()).to.be.equal('die');
    });
});
//# sourceMappingURL=CheckExecutor.js.map