"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("./Check/D20AttributeCheck");
var CheckExecutor_1 = require("./Check/CheckExecutor");
var DieBag_1 = require("./DieBag");
var DieModifier_1 = require("./Check/Modifier/DieModifier");
var check = new D20AttributeCheck_1.D20AttributeCheck(10, 15);
var newDie = new DieBag_1.DieBag();
newDie.add(4, 6);
check.setAttribute('Strength');
check.addDieModifier(new DieModifier_1.DieModifier('test', newDie, 'before', false, false));
check.addDieModifier(new DieModifier_1.DieModifier('un-test', newDie, 'after', true, true));
var checker = CheckExecutor_1.CheckExecutor.getInstance();
checker.execute(check);
console.log('Did the check pass?  ' + check.isPass());
console.log('Die Report: ' + JSON.stringify(check.getDieBag().report()));
console.log('Check Report: ' + check.report(true));
//# sourceMappingURL=index.js.map