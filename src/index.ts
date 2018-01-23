import { D20AttributeCheck } from './Check/D20AttributeCheck'
import { CheckExecutor } from "./Check/CheckExecutor";
import { DieModifier } from "./Check/Modifier/DieModifier";

let CE = CheckExecutor.getInstance();

let check = new D20AttributeCheck( 13, 10 , 'Strength' );
check.addModifier( new DieModifier( 'Fire Damage', ['1d6', '2d4'] ) );
check.addModifier( new DieModifier( 'Fire Resistance', '-1d4' ) );
CE.execute( check );

console.log( check.report( true ) );
