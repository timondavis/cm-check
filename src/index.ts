import { CheckExecutor } from "./Check/CheckExecutor";
import { Check } from "./Check/Check";
import { D20AttributeCheck } from "./Check/D20AttributeCheck"
import { SimpleCheck } from "./Check/SimpleCheck";
import { DieModifier } from "./Check/Modifier/DieModifier";
import { ResultModifier } from "./Check/Modifier/ResultModifier";
import { TargetModifier } from "./Check/Modifier/TargetModifier";
import { Modifier } from "./Check/Modifier/Modifier";
import { Die } from "./Die/Die";
import { DieBag } from "./Die/DieBag";

export { CheckExecutor, Check, D20AttributeCheck, SimpleCheck, DieModifier, ResultModifier, TargetModifier, Modifier, Die, DieBag }

module.exports = CheckExecutor.getInstance();
module.exports.Class = {};
module.exports.Class.Check = Check;
module.exports.Class.CheckExecutor = CheckExecutor.getInstance();
module.exports.Class.D20AttributeCheck = D20AttributeCheck;
module.exports.Class.SimpleCheck = SimpleCheck;
module.exports.Class.DieModifier = DieModifier;
module.exports.Class.ResultModifier = ResultModifier;
module.exports.Class.TargetModifier = TargetModifier;
module.exports.Class.Modifier = Modifier;
module.exports.Class.Die = Die;
module.exports.Class.DieBag = DieBag;






