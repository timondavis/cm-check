"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Die_1 = require("../../Die/Die");
var chai_1 = require("chai");
var chai_2 = require("chai");
require("mocha");
describe('Individual Die are behaving properly', function () {
    var die = new Die_1.Die(20);
    it('Creating new random die should work', function () {
        var randomSides;
        for (var turn = 0; turn < 3; turn++) {
            randomSides = Math.floor(Math.random() * Math.floor(20) + 1);
            die = new Die_1.Die(randomSides);
            chai_2.expect(randomSides).to.be.equal(die.sides);
        }
    });
    it('Rolling the die should generally change its value within 5 rolls', function () {
        die = new Die_1.Die(20);
        var startingValue = die.getValue();
        var valueHasChanged = false;
        for (var turn = 0; turn < 5; turn++) {
            die.roll();
            if (die.getValue() != startingValue) {
                valueHasChanged = true;
                break;
            }
        }
        chai_2.expect(valueHasChanged).to.be.true;
    });
    it('Die should allow manual change of values', function () {
        die = new Die_1.Die(100);
        die.roll();
        die.setValue(7);
        chai_1.assert(die.getValue() === 7);
    });
    it('Die should throw an error if a value is set out of range - the die should retain its value', function () {
        die = new Die_1.Die(6);
        die.setValue(4);
        chai_2.expect(function () { return die.setValue(7); }).to.throw("Defined Die value exceeds available range");
        chai_2.expect(function () { return die.setValue(0); }).to.throw("Defined Die value exceeds available range");
        chai_2.expect(function () { return die.setValue(-1); }).to.throw("Defined Die value exceeds available range");
        chai_2.expect(die.getValue()).to.be.equal(4);
    });
    it('Locked die should not change in value', function () {
        die = new Die_1.Die(100);
        var originalValue = die.roll().getValue();
        die.setLock(true);
        for (var loopCount = 0; loopCount < 5; loopCount++) {
            die.roll();
            chai_2.expect(die.getValue()).to.be.equal(originalValue);
        }
    });
    it('Die can be locked and unlocked', function () {
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
    it('Die reports correctly on lock state', function () {
        die = new Die_1.Die(50);
        chai_2.expect(die.isLocked()).to.be.false;
        die.setLock(true);
        chai_2.expect(die.isLocked()).to.be.true;
        die.setLock(false);
        chai_2.expect(die.isLocked()).to.be.false;
    });
});
//# sourceMappingURL=Die.js.map