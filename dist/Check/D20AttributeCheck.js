var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./Check", "./Modifier/ResultModifier"], function (require, exports, Check_1, ResultModifier_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var D20AttributeCheck = /** @class */ (function (_super) {
        __extends(D20AttributeCheck, _super);
        function D20AttributeCheck(target, attributeValue, name) {
            if (target === void 0) { target = 0; }
            if (attributeValue === void 0) { attributeValue = 0; }
            if (name === void 0) { name = 'Natural' +
                ' Attribute Modifier'; }
            var _this = _super.call(this, target) || this;
            _this.attributeValue = attributeValue;
            _this.name = name;
            _this.addModifier(new ResultModifier_1.ResultModifier(name, D20AttributeCheck.translateAttributeValue(attributeValue)));
            return _this;
        }
        /**
         * Get the formal typename of this check
         * @returns {string}
         */
        D20AttributeCheck.prototype.getType = function () {
            return 'd20-attribute';
        };
        /**
         * Update the attribute being checked against
         * @param {number} attributeValue
         */
        // @TODO Brute force is not efficient, sort then search
        D20AttributeCheck.prototype.setAttributeValue = function (attributeValue) {
            this.attributeValue = attributeValue;
            var modifiers = this.getModifiers();
            for (var modifierIndex = 0; modifierIndex < modifiers.length; modifierIndex++) {
                if (modifiers[modifierIndex].getName() == this.name) {
                    modifiers[modifierIndex].setValue(D20AttributeCheck.translateAttributeValue(attributeValue));
                    break;
                }
            }
        };
        D20AttributeCheck.prototype.setCheckDie = function () {
            this.dieBag.add(1, 20);
        };
        D20AttributeCheck.translateAttributeValue = function (value) {
            var isNegative = false;
            if (value < 10) {
                isNegative = true;
                value = Math.abs(10 - value);
            }
            else if (value === 10 || value === 11) {
                return 0;
            }
            else {
                value -= 11;
            }
            return (Math.ceil(value / 2) * ((isNegative) ? -1 : 1));
        };
        return D20AttributeCheck;
    }(Check_1.Check));
    exports.D20AttributeCheck = D20AttributeCheck;
});
