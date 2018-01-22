"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var D20AttributeCheck_1 = require("./Check/D20AttributeCheck");
var CheckExecutor_1 = require("./Check/CheckExecutor");
var DieModifierFactory_1 = require("./Check/Modifier/DieModifierFactory");
var check = new D20AttributeCheck_1.D20AttributeCheck(10, 15);
var DMF = new DieModifierFactory_1.DieModifierFactory();
var checker = CheckExecutor_1.CheckExecutor.getInstance();
//# sourceMappingURL=index.js.map