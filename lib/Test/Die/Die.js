"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Die_1 = require("../../Die/Die");
var chai_1 = require("chai");
var chai_2 = require("chai");
require("mocha");
describe('Die', function () {
    var die = new Die_1.Die(20);
    it('should be created with any number of sides', function () {
        var randomSides;
        for (var turn = 0; turn < 3; turn++) {
            randomSides = Math.floor(Math.random() * Math.floor(20) + 1);
            die = new Die_1.Die(randomSides);
            chai_2.expect(randomSides).to.be.equal(die.sides);
        }
    });
    it('should likely produce a different die value within 50 rolls of the same die', function () {
        die = new Die_1.Die(20);
        var startingValue = die.getValue();
        var valueHasChanged = false;
        for (var turn = 0; turn < 50; turn++) {
            die.roll();
            if (die.getValue() != startingValue) {
                valueHasChanged = true;
                break;
            }
        }
        chai_2.expect(valueHasChanged).to.be.true;
    });
    it('should allow manual updates to value', function () {
        die = new Die_1.Die(100);
        die.roll();
        die.setValue(7);
        chai_1.assert(die.getValue() === 7);
    });
    it('should throw an error if a value is set out of range - the die should retain its value', function () {
        die = new Die_1.Die(6);
        die.setValue(4);
        chai_2.expect(function () { return die.setValue(7); }).to.throw("Defined Die value exceeds available range");
        chai_2.expect(function () { return die.setValue(0); }).to.throw("Defined Die value exceeds available range");
        chai_2.expect(function () { return die.setValue(-1); }).to.throw("Defined Die value exceeds available range");
        chai_2.expect(die.getValue()).to.be.equal(4);
    });
    it('should not change in value if locked', function () {
        die = new Die_1.Die(100);
        var originalValue = die.roll().getValue();
        die.setLock(true);
        for (var loopCount = 0; loopCount < 5; loopCount++) {
            die.roll();
            chai_2.expect(die.getValue()).to.be.equal(originalValue);
        }
    });
    it('should behave as expected when locked and unlocked', function () {
        die = new Die_1.Die(10000);
        var originalValue = die.getValue();
        die.setLock(true);
        die.roll();
        chai_2.expect(die.getValue()).to.be.equal(originalValue);
        die.setLock(false);
        for (var loopCounter = 0; loopCounter < 5; loopCounter++) {
            die.roll();
            if (die.getValue() != originalValue) {
                break;
            }
        }
        chai_2.expect(die.getValue()).not.to.be.equal(originalValue);
    });
    it('should report correctly on lock state', function () {
        die = new Die_1.Die(50);
        chai_2.expect(die.isLocked()).to.be.false;
        die.setLock(true);
        chai_2.expect(die.isLocked()).to.be.true;
        die.setLock(false);
        chai_2.expect(die.isLocked()).to.be.false;
    });
});
//# sourceMappingURL=Die.js.map