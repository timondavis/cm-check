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
var ResultModifier = /** @class */ (function (_super) {
    __extends(ResultModifier, _super);
    function ResultModifier(name, value) {
        return _super.call(this, name, value) || this;
    }
    ResultModifier.prototype.applyTo = function (check) {
        var sumOfValues = Number(this.sumOfValues());
        check.setResult(check.getResult() + sumOfValues);
    };
    ResultModifier.prototype.getType = function () {
        return 'result';
    };
    return ResultModifier;
}(Modifier_1.Modifier));
exports.ResultModifier = ResultModifier;
//# sourceMappingURL=ResultModifier.js.map