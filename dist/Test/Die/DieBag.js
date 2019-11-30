define(["require", "exports", "../../Die/DieBag", "chai", "../TestCore", "mocha"], function (require, exports, DieBag_1, chai_1, TestCore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('DieBag', function () {
        var bag = new DieBag_1.DieBag();
        it('should add dice to the bag successfully', function () {
            bag = new DieBag_1.DieBag();
            var count = TestCore_1.TestCore.randomInt();
            var sides = TestCore_1.TestCore.randomInt();
            bag.add(count, sides);
            chai_1.expect(bag.getDieWithSides(sides)).has.lengthOf(count);
        });
        it('should facilitate adding dice en masse via import of a DieBag', function () {
            bag = new DieBag_1.DieBag();
            var mergeBag = new DieBag_1.DieBag();
            var bagAdds = {};
            for (var bagAddsLoop = 0; bagAddsLoop < TestCore_1.TestCore.randomInt(100); bagAddsLoop++) {
                TestCore_1.TestCore.trackRandomAddedDie(bagAdds, bag);
                TestCore_1.TestCore.trackRandomAddedDie(bagAdds, mergeBag);
            }
            bag.addBag(mergeBag);
            Object.keys(bagAdds).forEach(function (dieSides) {
                chai_1.expect(bag.getDieWithSides(dieSides)).to.have.lengthOf(bagAdds[dieSides]);
            });
        });
        it('should not allow adding or removing negative amounts of die', function () {
            bag = new DieBag_1.DieBag();
            chai_1.expect(function () { return bag.add(TestCore_1.TestCore.randomInt() * -1, TestCore_1.TestCore.randomInt()); }).to.throw;
            chai_1.expect(function () { return bag.remove(TestCore_1.TestCore.randomInt() * -1, TestCore_1.TestCore.randomInt()); }).to.throw;
        });
        it('should not allow less than 0 of any type of die to exist in the bag', function () {
            bag = new DieBag_1.DieBag();
            var sides = TestCore_1.TestCore.randomInt();
            var count = TestCore_1.TestCore.randomInt();
            bag.remove(sides, count);
            chai_1.expect(bag.getDieWithSides(sides)).to.have.length(0);
        });
        it('relies on Die class to prevent invalid die additions or removals from being processed', function () {
            bag = new DieBag_1.DieBag();
            chai_1.expect(function () { return bag.add(TestCore_1.TestCore.randomInt(), 0); }).to.throw;
            chai_1.expect(function () { return bag.add(TestCore_1.TestCore.randomInt(), -1); }).to.throw;
            chai_1.expect(function () { return bag.remove(TestCore_1.TestCore.randomInt(), 0); }).to.throw;
            chai_1.expect(function () { return bag.remove(TestCore_1.TestCore.randomInt(), -1); }).to.throw;
        });
        it('should retain die values when importing DieBag', function () {
            bag = new DieBag_1.DieBag();
            var mergeBag = new DieBag_1.DieBag();
            var count = TestCore_1.TestCore.randomInt();
            var sides = TestCore_1.TestCore.randomInt();
            mergeBag.add(count, sides);
            var dieValues = mergeBag.getDieWithSides(sides);
            bag.addBag(mergeBag);
            var mergedValues = bag.getDieWithSides(sides);
            for (var loopCounter = 0; loopCounter < count; loopCounter++) {
                chai_1.expect(dieValues[loopCounter].getValue()).to.be.equal(mergedValues[loopCounter].getValue());
            }
        });
        it('should allow a preset die value to be defined when adding dice to the bag', function () {
            bag = new DieBag_1.DieBag();
            var count = TestCore_1.TestCore.randomInt();
            var sides = TestCore_1.TestCore.randomInt();
            var value = TestCore_1.TestCore.randomInt(sides);
            var dieValues = [];
            bag.add(count, sides, value);
            dieValues = bag.getDieWithSides(sides);
            chai_1.expect(dieValues).to.have.lengthOf(count);
            for (var dieIndex = 0; dieIndex < count; dieIndex++) {
                chai_1.expect(dieValues[dieIndex].getValue()).to.be.equal(value);
            }
        });
        it('should remove a single die set from a bag successfully', function () {
            var addedDie = TestCore_1.TestCore.randomInt();
            var dieSides = TestCore_1.TestCore.randomInt();
            var removedDie = TestCore_1.TestCore.randomInt(addedDie - 1, true);
            bag = new DieBag_1.DieBag();
            bag.add(addedDie, dieSides);
            bag.remove(removedDie, dieSides);
            chai_1.expect(bag.getDieWithSides(dieSides)).has.lengthOf(addedDie - removedDie);
        });
        it('should allow die to removed en masse by supplying a DieBag', function () {
            var sides;
            var addCount;
            var removeCount;
            var tracker = {};
            var minusBag = new DieBag_1.DieBag();
            bag = new DieBag_1.DieBag();
            for (var loopCounter = 0; loopCounter < TestCore_1.TestCore.randomInt(); loopCounter++) {
                sides = TestCore_1.TestCore.randomInt();
                addCount = TestCore_1.TestCore.randomInt();
                removeCount = TestCore_1.TestCore.randomInt(addCount);
                TestCore_1.TestCore.trackRandomAddedDie(tracker, bag, '+', addCount, sides);
                TestCore_1.TestCore.trackRandomAddedDie(tracker, minusBag, '-', removeCount, sides);
            }
            bag.removeBag(minusBag, false);
            Object.keys(tracker).forEach(function (dieSides) {
                chai_1.expect(bag.getDieWithSides(dieSides)).to.have.lengthOf(tracker[dieSides]);
            });
        });
        it('should change the value of the total die value after the after its been rolled', function () {
            bag = new DieBag_1.DieBag();
            var count = TestCore_1.TestCore.randomInt();
            var sides = TestCore_1.TestCore.randomInt();
            bag.add(count, sides);
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
            var count = TestCore_1.TestCore.randomInt();
            var sides = TestCore_1.TestCore.randomInt();
            bag = new DieBag_1.DieBag();
            bag.add(count, sides);
            bag.dieMap[String(sides)][0].lock();
            var legacyValue = bag.dieMap[String(sides)][0].getValue();
            for (var loopCounter = 0; loopCounter < 10; loopCounter++) {
                bag.roll();
                if (legacyValue != bag.dieMap[String(sides)][0].getValue()) {
                    break;
                }
            }
            chai_1.expect(legacyValue).to.be.equal(bag.dieMap[String(sides)][0].getValue());
        });
        it('should provide an accurate report on the state of all die, sorted by type', function () {
            bag = new DieBag_1.DieBag();
            var dieDefinitions = [];
            var total;
            var reportedTotal;
            dieDefinitions = TestCore_1.TestCore.generateDieDefinitions();
            TestCore_1.TestCore.addDieToBagWithDefinitions(dieDefinitions, bag);
            bag.roll();
            TestCore_1.TestCore.validateCountsOnBagWithDefinitions(dieDefinitions, bag);
            reportedTotal = bag.getTotal();
            total = TestCore_1.TestCore.countTotalValuesOfDieInBag(bag);
            chai_1.expect(reportedTotal).to.be.equal(total);
        });
        it('should deliver all die filtered by # of sides correctly', function () {
            for (var testPass = 0; testPass < 50; testPass++) {
                bag = new DieBag_1.DieBag();
                var count1 = TestCore_1.TestCore.randomInt(100);
                var count2 = TestCore_1.TestCore.randomInt(100);
                var count3 = TestCore_1.TestCore.randomInt(100);
                var sides1 = TestCore_1.TestCore.randomInt(100);
                var sides2 = void 0;
                var sides3 = void 0;
                do {
                    sides2 = TestCore_1.TestCore.randomInt(100);
                } while (sides2 === sides1);
                do {
                    sides3 = TestCore_1.TestCore.randomInt(100);
                } while (sides3 == sides1 || sides3 == sides2);
                bag.add(count1, sides1);
                bag.add(count2, sides2);
                bag.add(count3, sides3);
                bag.roll();
                chai_1.expect(bag.getDieWithSides(sides1).length).is.equal(count1);
                chai_1.expect(bag.getDieWithSides(sides2).length).is.equal(count2);
                chai_1.expect(bag.getDieWithSides(sides3).length).is.equal(count3);
            }
        });
        it('provides a static service encoding die strings', function () {
            var count = TestCore_1.TestCore.randomInt();
            var sides = TestCore_1.TestCore.randomInt();
            var stringifiedDie = String(count) + 'd' + String(sides);
            chai_1.expect(DieBag_1.DieBag.encodeDieString(count, sides)).to.be.equal(stringifiedDie);
            count *= -1;
            chai_1.expect(DieBag_1.DieBag.encodeDieString(count, sides)).to.be.equal('-' + stringifiedDie);
        });
        it('provides a static service decoding die strings', function () {
            var count = TestCore_1.TestCore.randomInt();
            var sides = TestCore_1.TestCore.randomInt();
            var stringifiedDie = String(count) + 'd' + String(sides);
            chai_1.expect(DieBag_1.DieBag.decodeDieString(stringifiedDie).value[0]).to.be.equal(count);
            chai_1.expect(DieBag_1.DieBag.decodeDieString(stringifiedDie).value[1]).to.be.equal(sides);
            chai_1.expect(DieBag_1.DieBag.decodeDieString(stringifiedDie).directive).to.be.equal('add');
            chai_1.expect(DieBag_1.DieBag.decodeDieString('-' + stringifiedDie).value[0]).to.be.equal(count);
            chai_1.expect(DieBag_1.DieBag.decodeDieString('-' + stringifiedDie).value[1]).to.be.equal(sides);
            chai_1.expect(DieBag_1.DieBag.decodeDieString('-' + stringifiedDie).directive).to.be.equal('remove');
        });
        it('should prevent against invalid die encoding/decoding attempts', function () {
            chai_1.expect(function () { return DieBag_1.DieBag.encodeDieString(TestCore_1.TestCore.randomInt(), 0); }).to.throw;
            chai_1.expect(function () { return DieBag_1.DieBag.encodeDieString(TestCore_1.TestCore.randomInt(), -5); }).to.throw;
            chai_1.expect(function () { return DieBag_1.DieBag.decodeDieString('fred'); }).to.throw;
            chai_1.expect(function () { return DieBag_1.DieBag.decodeDieString('10d0'); }).to.throw;
            chai_1.expect(function () { return DieBag_1.DieBag.decodeDieString('10d-1'); }).to.throw;
        });
    });
});
