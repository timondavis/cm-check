"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DieBag_1 = require("../DieBag");
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
        this.targetModifiers = [];
        this.resultModifiers = [];
        this.dieModifiers = [];
        this.rawResult = 0;
        this.result = 0;
        this.dieBag = new DieBag_1.DieBag();
        this.addResultModifier({ name: 'baseAttributeModifier', value: attributeValue });
    }
    Check.prototype.addTargetModifier = function (modifier) {
        this.targetModifiers.push(modifier);
    };
    Check.prototype.addResultModifier = function (modifier) {
        this.resultModifiers.push(modifier);
    };
    Check.prototype.addDieModifier = function (modifier) {
        this.dieModifiers.push(modifier);
    };
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
    Check.prototype.getRawRollResult = function () {
        return this.rawResult;
    };
    Check.prototype.check = function () {
        this.dieBag.roll();
        this.rawResult = this.dieBag.getTotal();
        this.setResult(this.dieBag.getTotal());
    };
    Check.prototype.getDieBag = function () {
        return this.dieBag;
    };
    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number, modifiers: []any}}
     */
    Check.prototype.report = function (getReportAsString) {
        var report = { isPass: this.isPass(), target: this.target, result: this.result,
            modifiers: [
                { targetModifiers: this.getTargetModifiers() },
                { resultModifiers: this.getResultModifiers() },
                { dieModifiers: this.getDieModifiers() },
            ] };
        return (getReportAsString) ? JSON.stringify(report) : report;
    };
    Check.translateAttributeValue = function (value) { return value; };
    return Check;
}());
exports.Check = Check;
//# sourceMappingURL=Check.js.map