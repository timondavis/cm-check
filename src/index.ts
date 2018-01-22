import { D20AttributeCheck } from './Check/D20AttributeCheck'
import { CheckExecutor } from "./Check/CheckExecutor";
import { DieBag } from './DieBag';
import { DieModifier } from "./Check/Modifier/DieModifier";

let check = new D20AttributeCheck( 10, 15 );
let newDie = new DieBag();
newDie.add( 4, 6 );
check.setAttribute( 'Strength' );
check.addDieModifier( new DieModifier( 'test', newDie, 'before', false, false ) );
check.addDieModifier( new DieModifier( 'un-test', newDie, 'after', true, true ) );

let checker = CheckExecutor.getInstance();

checker.execute( check );

console.log( 'Did the check pass?  ' + check.isPass() );
console.log( 'Die Report: ' + JSON.stringify( check.getDieBag().report() ) );
console.log( 'Check Report: ' + check.report( true ) );
