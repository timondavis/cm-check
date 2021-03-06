"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetModifier = void 0;
var Modifier_1 = require("./Modifier");
var TargetModifier = /** @class */ (function (_super) {
    __extends(TargetModifier, _super);
    function TargetModifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TargetModifier.prototype.applyTo = function (check) {
        var sumOfValues = Number(this.sumOfValues());
        check.setTarget(check.getTarget() + sumOfValues);
    };
    TargetModifier.prototype.getType = function () {
        return 'target';
    };
    return TargetModifier;
}(Modifier_1.Modifier));
exports.TargetModifier = TargetModifier;
//# sourceMappingURL=TargetModifier.js.map