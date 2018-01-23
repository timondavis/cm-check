"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("./Check/D20AttributeCheck");
var CheckExecutor_1 = require("./Check/CheckExecutor");
var DieModifier_1 = require("./Check/Modifier/DieModifier");
var CE = CheckExecutor_1.CheckExecutor.getInstance();
var check = new D20AttributeCheck_1.D20AttributeCheck(13, 10, 'Strength');
check.addModifier(new DieModifier_1.DieModifier('Fire Damage', ['1d6', '2d4']));
check.addModifier(new DieModifier_1.DieModifier('Fire Resistance', '-1d4'));
CE.execute(check);
console.log(check.report(true));
//# sourceMappingURL=index.js.map