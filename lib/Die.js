"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var d = require('dice-bag');
var Die = /** @class */ (function () {
    function Die(sides) {
        this.sides = sides;
        this.value = 1;
        this.roll();
    }
    Die.prototype.roll = function () {
        return this.value = d(1, this.sides);
    };
    Die.prototype.getValue = function () {
        return this.value;
    };
    Die.prototype.setValue = function (newValue) {
        if (this.value > 0 && this.value <= this.sides) {
            this.value = newValue;
        }
    };
    return Die;
}());
exports.Die = Die;
