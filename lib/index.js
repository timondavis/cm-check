"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("./D20AttributeCheck");
var CheckExecutor_1 = require("./CheckExecutor");
var DieBag_1 = require("./DieBag");
var check = new D20AttributeCheck_1.D20AttributeCheck(24, 15);
var newDie = new DieBag_1.DieBag();
newDie.add(4, 6);
check.addDieModifier({ name: 'test', dieBag: newDie, remove: false, strictRemove: false, phase: 'before' });
check.addDieModifier({ name: 'un-test', dieBag: newDie, remove: true, strictRemove: false, phase: 'after' });
var checker = CheckExecutor_1.CheckExecutor.getInstance();
checker.execute(check);
console.log('Did the check pass?  ' + check.isPass());
console.log('Die Report: ' + JSON.stringify(check.getDieBag().report()));
console.log('Check Report: ' + check.report(true));
//# sourceMappingURL=index.js.map