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
require("mocha");
var chai_1 = require("chai");
var DieModifier_1 = require("../../Check/Modifier/DieModifier");
var CheckExecutor_1 = require("../../Check/CheckExecutor");
var Check_1 = require("../../Check/Check");
var TestCore_1 = require("../TestCore");
var DieBag_1 = require("../../Die/DieBag");
describe('DieModifier', function () {
    var c;
    var CE = CheckExecutor_1.CheckExecutor.getInstance();
    var MyCheck = /** @class */ (function (_super) {
        __extends(MyCheck, _super);
        function MyCheck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MyCheck.prototype.getType = function () { return 'MyCheck'; };
        MyCheck.prototype.setCheckDie = function () { };
        return MyCheck;
    }(Check_1.Check));
    it('should be applied after the _modifiers hook in the "before" phase, by default', function () {
        var originalDieCount = TestCore_1.TestCore.randomInt();
        var originalDieSides = TestCore_1.TestCore.randomInt();
        var newDieCount = TestCore_1.TestCore.randomInt();
        var newDieSides;
        do {
            newDieSides = TestCore_1.TestCore.randomInt();
        } while (newDieSides === originalDieSides);
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        c.getDieBag().add(originalDieCount, originalDieSides);
        c.addModifier(new DieModifier_1.DieModifier('Die Modifier', DieBag_1.DieBag.encodeDieString(newDieCount, newDieSides)));
        CE.on(c.getType() + '_roll', function (check) {
            chai_1.expect(check.getDieBag().getDieWithSides(newDieSides)).to.have.length(newDieCount);
        });
        CE.execute(c);
        CE.removeAllListeners(c.getType() + '_roll');
    });
    it('should allow for modifying die after the roll as well, affecting the result', function () {
        var originalDieCount = TestCore_1.TestCore.randomInt();
        var originalDieSides = TestCore_1.TestCore.randomInt();
        var originalDieString = DieBag_1.DieBag.encodeDieString(originalDieCount, originalDieSides);
        var m = new DieModifier_1.DieModifier('Die Modifier', [originalDieString]);
        m.setPhase('after');
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        c.addModifier(m);
        CE.execute(c);
        chai_1.expect(c.getResult()).to.not.be.equal(0);
        chai_1.expect(c.getResult()).to.not.be.equal(c.getRawRollResult());
        chai_1.expect(c.getRawRollResult()).to.be.equal(0);
        var r = c.report(false);
        chai_1.expect(TestCore_1.TestCore.countTotalValuesOfDieInBag(c.getDieBag(), String(originalDieSides)))
            .to.be.equal(c.getResult());
    });
    it('should allow 1 to many die sets to be added with one modifier', function () {
        var dieDefinitions = TestCore_1.TestCore.generateDieDefinitions();
        var dieDefinitionStrings = [];
        var singleDieSides = TestCore_1.TestCore.randomInt();
        var singleDieCount = TestCore_1.TestCore.randomInt();
        // Create a check and apply modifier with multiple values
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        for (var dieDefinitionIndex = 0; dieDefinitionIndex < dieDefinitions.length; dieDefinitionIndex++) {
            dieDefinitionStrings.push(String(dieDefinitions[dieDefinitionIndex][0]) + 'd' +
                String(dieDefinitions[dieDefinitionIndex][1]));
        }
        c.addModifier(new DieModifier_1.DieModifier('Die Modifier', dieDefinitionStrings));
        CE.execute(c);
        for (var dieDefinitionIndex = 0; dieDefinitionIndex < dieDefinitions.length; dieDefinitionIndex++) {
            chai_1.expect(c.getDieBag().getDieWithSides(dieDefinitions[dieDefinitionIndex][1]))
                .to.have.length(dieDefinitions[dieDefinitionIndex][0]);
        }
        chai_1.expect(TestCore_1.TestCore.countTotalValuesOfDieInBag(c.getDieBag())).to.be.equal(c.getResult());
        // Create a check and apply modifier with single value
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        c.addModifier(new DieModifier_1.DieModifier('Die Modifier', DieBag_1.DieBag.encodeDieString(singleDieCount, singleDieSides)));
        CE.execute(c);
        chai_1.expect(c.getDieBag().getDieWithSides(singleDieSides)).to.have.length(singleDieCount);
        chai_1.expect(TestCore_1.TestCore.countTotalValuesOfDieInBag(c.getDieBag())).to.be.equal(c.getResult());
    });
    it('should decode XdY values and add as many die to the check', function () {
        var randomSides = TestCore_1.TestCore.randomInt();
        var randomCount = TestCore_1.TestCore.randomInt();
        var randomDieDefine = String(randomCount) + 'd' + String(randomSides);
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        c.addModifier(new DieModifier_1.DieModifier('Die modifier', randomDieDefine));
        CE.execute(c);
        chai_1.expect(c.getDieBag().getDieWithSides(randomSides)).to.have.length(randomCount);
    });
    it('should report values in XdY format', function () {
        var dieCount = TestCore_1.TestCore.randomInt();
        var dieSides = TestCore_1.TestCore.randomInt();
        var dieString = String(dieCount) + 'd' + String(dieSides);
        var m = new DieModifier_1.DieModifier('Die String', dieString);
        chai_1.expect(String(m.getValue())).equals(dieString);
    });
    it('should support adding OR removing die from the check', function () {
        var dieAddedCount = TestCore_1.TestCore.randomInt();
        var dieAddedSides = TestCore_1.TestCore.randomInt();
        var dieRemovedCount = TestCore_1.TestCore.randomInt(dieAddedCount);
        c = new MyCheck(TestCore_1.TestCore.randomInt());
        c.addModifier(new DieModifier_1.DieModifier('Die Modifier', [
            String(dieAddedCount) + 'd' + String(dieAddedSides),
            '-' + String(dieRemovedCount) + 'd' + String(dieAddedSides)
        ]));
        CE.execute(c);
        chai_1.expect(c.getDieBag().getDieWithSides(dieAddedSides))
            .to.have.length(dieAddedCount - dieRemovedCount);
    });
    it('should report its typename', function () {
        var modifier = new DieModifier_1.DieModifier('Name', TestCore_1.TestCore.randomInt());
        chai_1.expect(modifier.getType()).to.be.equal('die');
    });
});
//# sourceMappingURL=DieModifier.js.map