import { D20AttributeCheck } from './Check/D20AttributeCheck'
import { CheckExecutor } from "./Check/CheckExecutor";
import { DieModifierFactory } from "./Check/Modifier/DieModifierFactory";
import { DieModifier } from "./Check/Modifier/DieModifier";
import { DieBag } from "./DieBag";

let check = new D20AttributeCheck( 10, 15 );
let DMF = new DieModifierFactory();
let checker = CheckExecutor.getInstance();

