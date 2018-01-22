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
var DieModifier = /** @class */ (function (_super) {
    __extends(DieModifier, _super);
    function DieModifier(name, dieBag, phase, remove, strictRemove) {
        var _this = _super.call(this, name, -1) || this;
        _this.name = name;
        _this.dieBag = dieBag;
        _this.phase = phase;
        _this.remove = remove;
        _this.strictRemove = strictRemove;
        return _this;
    }
    DieModifier.prototype.getDieBag = function () {
        return this.dieBag;
    };
    return DieModifier;
}(Modifier_1.Modifier));
exports.DieModifier = DieModifier;
//# sourceMappingURL=DieModifier.js.map