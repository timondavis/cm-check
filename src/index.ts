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

module.exports.Check = Check;
module.exports.CheckExecutor = CheckExecutor.getInstance();
module.exports.D20AttributeCheck = D20AttributeCheck;
module.exports.SimpleCheck = SimpleCheck;
module.exports.DieModifier = DieModifier;
module.exports.ResultModifier = ResultModifier;
module.exports.TargetModifier = TargetModifier;
module.exports.Modifier = Modifier;
module.exports.Die = Die;
module.exports.DieBag = DieBag;






