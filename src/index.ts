import { D20AttributeCheck } from './Check/D20AttributeCheck'
import { CheckExecutor } from "./Check/CheckExecutor";
import { DieModifierFactory } from "./Check/Modifier/DieModifierFactory";
import { DieModifier } from "./Check/Modifier/DieModifier";
import { DieBag } from "./DieBag";

let CE = CheckExecutor.getInstance();

let check = new D20AttributeCheck( 13, 10 , 'Strength' );
CE.execute( check );

console.log( check.report( true ) );
