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
var CheckExecutor_1 = require("../../Check/CheckExecutor");
var Check_1 = require("../../Check/Check");
var TestCore_1 = require("../TestCore");
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
        MyCheck.prototype.setBaseDieBag = function () { };
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
});
//# sourceMappingURL=CheckExecutor.js.map