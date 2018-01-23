import { D20AttributeCheck } from './Check/D20AttributeCheck'
import { CheckExecutor } from "./Check/CheckExecutor";

let CE = CheckExecutor.getInstance();

let check = new D20AttributeCheck( 13, 10 , 'Strength' );
CE.execute( check );

console.log( check.report( true ) );
