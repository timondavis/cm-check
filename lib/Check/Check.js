"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DieBag_1 = require("../DieBag");
var Check = /** @class */ (function () {
    /**
     * @pre The attribute defined must exist on any entities tested against this check.
     *
     * @param {number} target
     */
    function Check(target) {
        this.target = target;
        this.targetModifiers = [];
        this.resultModifiers = [];
        this.dieModifiers = [];
        this.rawResult = 0;
        this.result = 0;
        this.dieBag = new DieBag_1.DieBag();
        this.setBaseDieBag();
    }
    /**
     * Add a new modifier to the check's target number before the roll
     *
     * @param {TargetModifier} modifier
     */
    Check.prototype.addTargetModifier = function (modifier) {
        this.targetModifiers.push(modifier);
    };
    /**
     * Add a new modifier to the check's result after the roll
     *
     * @param {ResultModifier} modifier
     */
    Check.prototype.addResultModifier = function (modifier) {
        this.resultModifiers.push(modifier);
    };
    /**
     * Add a new modifier to the amount of die (before or after the roll)
     *
     * @param {DieModifier} modifier
     */
    Check.prototype.addDieModifier = function (modifier) {
        this.dieModifiers.push(modifier);
    };
    /**
     * Get a collection of all registered target modifiers
     * @returns {TargetModifier[]}
     */
    Check.prototype.getTargetModifiers = function () { return this.targetModifiers; };
    /**
     * Get a collection of all registered result modifiers
     * @returns {ResultModifier[]}
     */
    Check.prototype.getResultModifiers = function () { return this.resultModifiers; };
    /**
     * Get a collection of all registered die modifiers
     * @returns {DieModifier[]}
     */
    Check.prototype.getDieModifiers = function () { return this.dieModifiers; };
    /**
     * Has the check passed?
     *
     * @returns {boolean}
     */
    Check.prototype.isPass = function () {
        return (this.result >= this.target);
    };
    /**
     * Set or reset the target number for the check
     *
     * @param {number} target
     */
    Check.prototype.setTarget = function (target) {
        this.target = target;
    };
    /**
     * Get the target number for the check
     *
     * @returns {number}
     */
    Check.prototype.getTarget = function () {
        return this.target;
    };
    /**
     * Set or reset the result of the check
     *
     * @param {number} result
     */
    Check.prototype.setResult = function (result) {
        this.result = result;
    };
    /**
     * Get the current result value on the check
     * @returns {number}
     */
    Check.prototype.getResult = function () {
        return this.result;
    };
    /**
     * Get the result of dice rolled, without modifiers.
     * @returns {number}
     */
    Check.prototype.getRawRollResult = function () {
        return this.rawResult;
    };
    /**
     * Execute the check
     */
    Check.prototype.check = function () {
        this.dieBag.roll();
        this.rawResult = this.dieBag.getTotal();
        this.setResult(this.dieBag.getTotal());
    };
    /**
     * Get the die bag belonging to the check
     *
     * @returns {DieBag}
     */
    Check.prototype.getDieBag = function () {
        return this.dieBag;
    };
    /**
     * Get a report on the status of the check
     * @param {boolean} getReportAsString
     *
     * @returns {string | {{isPass: boolean; target: number; result: number, modifiers: []any, number}}
     */
    Check.prototype.report = function (getReportAsString) {
        var report = {
            isPass: this.isPass(),
            target: this.target,
            result: this.result,
            modifiers: [
                { targetModifiers: this.getTargetModifiers() },
                { resultModifiers: this.getResultModifiers() },
                { dieModifiers: this.getDieModifiers() },
            ],
            rollResult: this.getDieBag().getTotal()
        };
        return (getReportAsString) ? JSON.stringify(report) : report;
    };
    return Check;
}());
exports.Check = Check;
//# sourceMappingURL=Check.js.map