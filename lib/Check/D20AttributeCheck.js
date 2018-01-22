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
var Check_1 = require("./Check");
var ResultModifierFactory_1 = require("./Modifier/ResultModifierFactory");
var D20AttributeCheck = /** @class */ (function (_super) {
    __extends(D20AttributeCheck, _super);
    function D20AttributeCheck(attributeValue, target, attributeName) {
        if (attributeName === void 0) { attributeName = ''; }
        var _this = _super.call(this, target) || this;
        _this.attributeValue = attributeValue;
        _this.attributeName = attributeName;
        if (!_this.attributeName) {
            _this.attributeName = 'D20Attribute';
        }
        _this.addResultModifier(new ResultModifierFactory_1.ResultModifierFactory().create(_this.attributeName, {
            value: String(D20AttributeCheck.translateAttributeValue(attributeValue))
        }));
        return _this;
    }
    /**
     * Set the name of the attribute being checked against
     * @param {string} name
     */
    D20AttributeCheck.prototype.setAttributeName = function (name) {
        this.attributeName = name;
    };
    /**
     * Get the name of the attribute being checked against
     * @returns {string | undefined}
     */
    D20AttributeCheck.prototype.getName = function () {
        return this.attributeName;
    };
    /**
     * Get the formal typename of this check
     * @returns {string}
     */
    D20AttributeCheck.prototype.getType = function () {
        return this.attributeName + 'Attribute';
    };
    /**
     *
     */
    D20AttributeCheck.prototype.setBaseDieBag = function () {
        this.dieBag.add(1, 20);
    };
    D20AttributeCheck.translateAttributeValue = function (value) {
        if (value <= 3) {
            return -3;
        }
        else if (value <= 6) {
            return -2;
        }
        else if (value <= 9) {
            return -1;
        }
        else if (value <= 12) {
            return 0;
        }
        else if (value <= 15) {
            return 1;
        }
        else if (value <= 18) {
            return 2;
        }
        else if (value <= 21) {
            return 3;
        }
        else {
            return 4;
        }
    };
    return D20AttributeCheck;
}(Check_1.Check));
exports.D20AttributeCheck = D20AttributeCheck;
//# sourceMappingURL=D20AttributeCheck.js.map