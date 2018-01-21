"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var CheckExecutor = /** @class */ (function (_super) {
    __extends(CheckExecutor, _super);
    function CheckExecutor() {
        return _super.call(this) || this;
    }
    /**
     * Get the global instance of the Check Machine
     * @returns {CheckMachine}
     */
    CheckExecutor.prototype.getInstance = function () {
        if (this.instance === null) {
            this.instance = new CheckExecutor();
        }
        return this.instance;
    };
    /**
     * Execute a check
     *
     * @param {Check} check
     * @param entity
     * @param {number} target
     * @returns {Check}
     */
    CheckExecutor.prototype.execute = function (check, target, entity) {
        if (entity === void 0) { entity = null; }
        this.on(check.getType() + '_add_die_modifiers', CheckExecutor.processDieModifiers);
        this.emit(check.getType() + '_add_die_modifiers', check);
        this.on(check.getType() + '_add_target_modifiers', CheckExecutor.processTargetModifiers);
        this.emit(check.getType() + '_add_target_modifiers', check);
        CheckExecutor.doCheck(check);
        this.on(check.getType() + '_add_target_modifiers', CheckExecutor.processTargetModifiers);
        this.emit(check.getType() + '_add_target_modifiers', check);
        this.removeListener(check.getType() + '_add_target_modifiers', CheckExecutor.processTargetModifiers);
        this.removeListener(check.getType() + '_add_die_modifiers', CheckExecutor.processDieModifiers);
        this.removeListener(check.getType() + '_add_result_modifiers', CheckExecutor.processResultModifiers);
        return check.isPass();
    };
    CheckExecutor.doCheck = function (check) {
        check.getDieBag().roll();
    };
    CheckExecutor.processTargetModifiers = function (check) {
        var counter;
        var targetModifiers = check.getTargetModifiers();
        for (counter = 0; counter < targetModifiers.length; counter++) {
            check.setTarget(check.getTarget() + targetModifiers[counter].value);
        }
    };
    CheckExecutor.processResultModifiers = function (check) {
        var counter;
        var resultModifiers = check.getResultModifiers();
        for (counter = 0; counter < resultModifiers.length; counter++) {
            check.setResult(check.getResult() + resultModifiers[counter].value);
        }
    };
    CheckExecutor.processDieModifiers = function (check) {
        var counter;
        var dieModifiers = check.getDieModifiers();
        for (counter = 0; counter < dieModifiers.length; counter++) {
            //@TODO Implement This
        }
    };
    return CheckExecutor;
}(events_1.EventEmitter));
exports.CheckExecutor = CheckExecutor;
