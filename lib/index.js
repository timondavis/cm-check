"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("./Check/D20AttributeCheck");
var CheckExecutor_1 = require("./Check/CheckExecutor");
var CE = CheckExecutor_1.CheckExecutor.getInstance();
var check = new D20AttributeCheck_1.D20AttributeCheck(13, 10, 'Strength');
CE.execute(check);
console.log(check.report(true));
//# sourceMappingURL=index.js.map