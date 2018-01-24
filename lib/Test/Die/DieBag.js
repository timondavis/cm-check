"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DieBag_1 = require("../../Die/DieBag");
var chai_1 = require("chai");
require("mocha");
describe('DieBag', function () {
    var bag = new DieBag_1.DieBag();
    it('should add dice to the bag successfully', function () {
        bag = new DieBag_1.DieBag();
        bag.add(1, 6);
        chai_1.expect(bag.report()).to.have.ownProperty('6');
        chai_1.expect(bag.report()['6']).has.lengthOf(1);
    });
    it('should facilitate adding dice en masse via import of a DieBag', function () {
        bag = new DieBag_1.DieBag();
        var mergeBag = new DieBag_1.DieBag();
        bag.add(2, 6);
        bag.add(4, 12);
        mergeBag.add(5, 2);
        mergeBag.add(2, 6);
        mergeBag.add(7, 12);
        bag.addBag(mergeBag);
        chai_1.expect(bag.report()).to.have.ownProperty('2');
        chai_1.expect(bag.report()['2']).has.lengthOf(5);
        chai_1.expect(bag.report()).to.have.ownProperty('6');
        chai_1.expect(bag.report()['6']).has.lengthOf(4);
        chai_1.expect(bag.report()).to.have.ownProperty('12');
        chai_1.expect(bag.report()['12']).has.lengthOf(11);
    });
    it('should retain die values when importing DieBag', function () {
        bag = new DieBag_1.DieBag();
        var mergeBag = new DieBag_1.DieBag();
        mergeBag.add(3, 6);
        var dieValues = mergeBag.report()['6'];
        bag.addBag(mergeBag);
        var mergedValues = bag.report()['6'];
        for (var loopCounter = 0; loopCounter < 3; loopCounter++) {
            chai_1.expect(dieValues[loopCounter].getValue()).to.be.equal(mergedValues[loopCounter].getValue());
        }
    });
    it('should allow a preset die value to be defined when adding dice to the bag', function () {
        bag = new DieBag_1.DieBag();
        bag.add(3, 1000, 77);
        chai_1.expect(bag.report()).to.have.ownProperty('1000');
        chai_1.expect(bag.report()['1000']).has.lengthOf(3);
        chai_1.expect(bag.report()['1000'][0].getValue()).to.be.equal(77);
    });
    it('should remove a single die set from a bag successfully', function () {
        bag = new DieBag_1.DieBag();
        bag.add(5, 4);
        bag.remove(3, 4);
        chai_1.expect(bag.report()).to.have.ownProperty('4');
        chai_1.expect(bag.report()['4']).has.lengthOf(2);
    });
    it('should allow die to removed en masse by supplying a DieBag', function () {
        bag = new DieBag_1.DieBag();
        var minusBag = new DieBag_1.DieBag();
        bag.add(4, 12);
        bag.add(2, 6);
        minusBag.add(2, 12);
        minusBag.add(1, 6);
        bag.removeBag(minusBag, false);
        chai_1.expect(bag.report()['12']).has.lengthOf(2);
        chai_1.expect(bag.report()['6']).has.lengthOf(1);
    });
    it('should change the value of the total die value after the after its been rolled', function () {
        bag = new DieBag_1.DieBag();
        bag.add(20, 8);
        var oldResults = bag.getTotal();
        for (var loopCounter = 0; loopCounter < 3; loopCounter++) {
            bag.roll();
            if (oldResults != bag.getTotal()) {
                break;
            }
        }
        chai_1.expect(oldResults).to.not.be.equal(bag.getTotal());
    });
    it('should not cause locked die to be rerolled', function () {
        bag = new DieBag_1.DieBag();
        bag.add(12, 100);
        bag.dieMap['100'][0].setLock(true);
        var legacyValue = bag.dieMap['100'][0].getValue();
        for (var loopCounter = 0; loopCounter < 3; loopCounter++) {
            bag.roll();
            if (legacyValue != bag.dieMap['100'][0].getValue()) {
                break;
            }
        }
        chai_1.expect(legacyValue).to.be.equal(bag.dieMap['100'][0].getValue());
    });
    it('should provide an accurate report on the state of all die, sorted by type', function () {
        bag = new DieBag_1.DieBag();
        bag.add(4, 8);
        bag.add(8, 6);
        bag.add(10, 20);
        bag.add(5, 4);
        bag.add(7, 12);
        bag.add(2, 8);
        bag.roll();
        var reportedTotal = bag.getTotal();
        chai_1.expect(bag.dieMap['8']).has.lengthOf(6);
        chai_1.expect(bag.dieMap['6']).has.lengthOf(8);
        chai_1.expect(bag.dieMap['20']).has.lengthOf(10);
        chai_1.expect(bag.dieMap['4']).has.lengthOf(5);
        chai_1.expect(bag.dieMap['12']).has.lengthOf(7);
        var total = 0;
        for (var loopCounter = 0; loopCounter < 3; loopCounter++) {
            total = 0;
            Object.keys(bag.dieMap).forEach(function (sides) {
                for (var dieIndex = 0; dieIndex < bag.dieMap[sides].length; dieIndex++) {
                    total += bag.dieMap[sides][dieIndex].getValue();
                }
            });
        }
        chai_1.expect(reportedTotal).to.be.equal(total);
    });
});
//# sourceMappingURL=DieBag.js.map