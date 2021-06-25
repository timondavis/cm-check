"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DieRoller = /** @class */ (function () {
    function DieRoller() {
    }
    DieRoller.roll = function (numberOfDice, numberOfSides) {
        var total = 0;
        for (var i = 0; i < numberOfDice; i++) {
            total += DieRoller.dice(numberOfSides);
        }
        return total;
    };
    DieRoller.dice = function (sides) {
        return Math.floor(Math.random() * sides + 1);
    };
    return DieRoller;
}());
exports.DieRoller = DieRoller;
//# sourceMappingURL=DieRoller.js.map