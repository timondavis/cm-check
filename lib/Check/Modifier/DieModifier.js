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
var Modifier_1 = require("./Modifier");
var DieBag_1 = require("../../Die/DieBag");
var DieModifier = /** @class */ (function (_super) {
    __extends(DieModifier, _super);
    function DieModifier(name, value) {
        if (name === void 0) { name = 'Die Modifier'; }
        if (value === void 0) { value = []; }
        var _this = _super.call(this, name, value) || this;
        _this.name = name;
        _this.value = value;
        _this.setPhase('before');
        return _this;
    }
    DieModifier.prototype.applyTo = function (check) {
        var dieDirective;
        if (Array.isArray(this.value)) {
            for (var valueIndex = 0; valueIndex < this.value.length; valueIndex++) {
                dieDirective = DieBag_1.DieBag.decodeDieString(String(this.value[valueIndex]));
                DieModifier.processDieDirectiveOn(check, dieDirective);
            }
        }
        else {
            dieDirective = DieBag_1.DieBag.decodeDieString(String(this.value));
            DieModifier.processDieDirectiveOn(check, dieDirective);
        }
    };
    DieModifier.prototype.getType = function () {
        return 'die';
    };
    DieModifier.processDieDirectiveOn = function (check, dieDirective) {
        if (dieDirective.directive === 'add') {
            check.getDieBag().add(dieDirective.value[0], dieDirective.value[1]);
        }
        else if (dieDirective.directive === 'remove') {
            check.getDieBag().remove(dieDirective.value[0], dieDirective.value[1]);
        }
    };
    return DieModifier;
}(Modifier_1.Modifier));
exports.DieModifier = DieModifier;
//# sourceMappingURL=DieModifier.js.map