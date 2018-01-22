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
        var _this = _super.call(this) || this;
        _this.isExecutingHook = false;
        return _this;
    }
    /**
     * Get the global instance of the Check Machine
     * @returns {CheckExecutor}
     */
    CheckExecutor.getInstance = function () {
        return CheckExecutor.instance;
    };
    /**
     * Execute a check
     *
     * @TODO THREAD LOCKING IS VERY RUDIMENTARY.  IMPROVE
     * @param {Check} check
     * @param entity
     * @param {number} target
     * @returns {Check}
     */
    CheckExecutor.prototype.execute = function (check) {
        this.isExecutingHook = true;
        this.on(check.getType() + '_add_die_modifiers_before', this.processDieModifiers);
        this.emit(check.getType() + '_add_die_modifiers_before', check, 'before');
        while (this.isExecutingHook) { }
        ;
        this.isExecutingHook = true;
        this.on(check.getType() + '_add_target_modifiers', this.processTargetModifiers);
        this.emit(check.getType() + '_add_target_modifiers', check, 'before');
        while (this.isExecutingHook) { }
        ;
        this.doCheck(check);
        this.isExecutingHook = true;
        this.on(check.getType() + '_add_result_modifiers', this.processResultModifiers);
        this.emit(check.getType() + '_add_result_modifiers', check, 'after');
        while (this.isExecutingHook) { }
        ;
        this.isExecutingHook = true;
        this.on(check.getType() + '_add_die_modifiers_after', this.processDieModifiers);
        this.emit(check.getType() + '_add_die_modifiers_after', check, 'after');
        while (this.isExecutingHook) { }
        ;
        // Has the dice bag been affected in a way that affects the final result?  Compare the difference between
        // the adjusted and original dice rolls and apply the difference to the result.
        var difference = check.getDieBag().getTotal() - check.getRawRollResult();
        if (difference !== 0) {
            check.setResult(check.getResult() + difference);
        }
        this.removeListener(check.getType() + '_add_die_modifiers_before', this.processDieModifiers);
        this.removeListener(check.getType() + '_add_target_modifiers', this.processTargetModifiers);
        this.removeListener(check.getType() + '_add_result_modifiers', this.processResultModifiers);
        this.removeListener(check.getType() + '_add_die_modifiers_after', this.processDieModifiers);
        return check.isPass();
    };
    CheckExecutor.prototype.doCheck = function (check) {
        check.check();
    };
    CheckExecutor.prototype.processTargetModifiers = function (check, phase) {
        var counter;
        var targetModifiers = check.getTargetModifiers();
        for (counter = 0; counter < targetModifiers.length; counter++) {
            check.setTarget(check.getTarget() + targetModifiers[counter].value);
        }
        this.isExecutingHook = false;
    };
    CheckExecutor.prototype.processResultModifiers = function (check, phase) {
        var counter;
        var resultModifiers = check.getResultModifiers();
        for (counter = 0; counter < resultModifiers.length; counter++) {
            check.setResult(check.getResult() + resultModifiers[counter].value);
        }
        this.isExecutingHook = false;
    };
    CheckExecutor.prototype.processDieModifiers = function (check, phase) {
        var counter;
        var dieModifiers = check.getDieModifiers();
        for (counter = 0; counter < dieModifiers.length; counter++) {
            if (dieModifiers[counter].phase != phase) {
                continue;
            }
            if (dieModifiers[counter].remove) {
                check.getDieBag().removeBag(dieModifiers[counter].dieBag, dieModifiers[counter].strictRemove);
            }
            else {
                check.getDieBag().addBag(dieModifiers[counter].dieBag);
            }
        }
        this.isExecutingHook = false;
    };
    CheckExecutor.instance = new CheckExecutor();
    return CheckExecutor;
}(events_1.EventEmitter));
exports.CheckExecutor = CheckExecutor;
//# sourceMappingURL=CheckExecutor.js.map