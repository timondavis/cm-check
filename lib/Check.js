"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DieBag_1 = require("./DieBag");
var Check = /** @class */ (function () {
    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} attributeValue
     * @param {number} target
     */
    function Check(attributeValue, target) {
        this.attributeValue = attributeValue;
        this.target = target;
        this.result = 0;
        this.dieBag = new DieBag_1.DieBag();
    }
    Check.prototype.addAttributeModifier = function (modifier) {
        this.attributeModifiers.push(modifier);
    };
    Check.prototype.addTargetModifier = function (modifier) {
        this.targetModifiers.push(modifier);
    };
    Check.prototype.addResultModifier = function (modifier) {
        this.resultModifiers.push(modifier);
    };
    Check.prototype.addDieModifier = function (modifier) {
        this.dieModifiers.push(modifier);
    };
    Check.prototype.getAttributeModifiers = function () { return this.attributeModifiers; };
    Check.prototype.getTargetModifiers = function () { return this.targetModifiers; };
    Check.prototype.getResultModifiers = function () { return this.resultModifiers; };
    Check.prototype.getDieModifiers = function () { return this.dieModifiers; };
    Check.prototype.isPass = function () {
        return (this.result >= this.target);
    };
    Check.prototype.setTarget = function (target) {
        this.target = target;
    };
    Check.prototype.getTarget = function () {
        return this.target;
    };
    Check.prototype.setResult = function (result) {
        this.result = result;
    };
    Check.prototype.getResult = function () {
        return this.result;
    };
    Check.prototype.check = function () {
        this.dieBag.roll();
    };
    Check.prototype.getDieBag = function () {
        return this.dieBag;
    };
    return Check;
}());
exports.Check = Check;
