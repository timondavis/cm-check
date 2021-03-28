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

let ex = {
    Check: Check,
    CheckExecutor: CheckExecutor,
    D20AttributeCheck: D20AttributeCheck,
    SimpleCheck: SimpleCheck,
    DieModifier: DieModifier,
    ResultModifier: ResultModifier,
    TargetModifier: TargetModifier,
    Modifier: Modifier,
    Die: Die,
    DieBag: DieBag
}

module.exports = ex;